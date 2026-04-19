import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), ".env")
});
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import mongoose from "mongoose";
import Donation from "./models/Donation.js";
import Settings from "./models/Settings.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "./models/Admin.js";
import { sendReceipt } from "./utils/sendReceipt.js";
import fs from "fs";
import generateDonationNumber from "./utils/generateDonationNumber.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import { sendImmediateImpactEmail } from "./utils/sendImmediateImpactEmail.js";
import "./jobs/emailSequence.js";
import newsletterSendRoutes from "./routes/newsletterSend.js";
import draftRoutes from "./routes/draftRoutes.js";
import engagementRoutes from "./routes/engagementRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import crypto from "crypto";
import { sendEmail } from "./utils/sendEmail.js"
import { verifyAdmin } from "./middleware/verifyAdmin.js";
import paypal from "@paypal/checkout-server-sdk";
import client from "./paypalClient.js";


const app = express();

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      "http://localhost:3000",
      "https://shoova-initiation.vercel.app",
      "https://www.shoovainitiative.org"
    ];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const seedAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const passwordRaw = process.env.ADMIN_PASSWORD?.trim();

    if (!email || !passwordRaw) {
      console.log("⚠️ Admin env variables missing");
      return;
    }

    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(passwordRaw, 10);

      await Admin.create({
        email,
        password: hashedPassword
      });

      console.log("✅ Admin auto-created");
    } else {
      console.log("ℹ️ Admin already exists");
    }

  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await seedAdmin(); // ✅ now safe

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Startup error:", err);
  }
};

startServer();





/* ==============================
   NORMAL JSON ROUTES
============================== */

app.post("/create-paypal-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount < 1) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    console.log("💰 PayPal amount:", amount);

    const request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString()
          }
        }
      ],
    });

    const order = await client.execute(request);

    res.json({
      id: order.result.id,
      links: order.result.links
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PayPal order creation failed" });
  }
});

app.post("/capture-paypal-order", async (req, res) => {
  try {
    const { orderID } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client.execute(request);

    const payer = capture.result.payer;
    const purchaseUnit = capture.result.purchase_units?.[0];
    const paymentCapture = purchaseUnit?.payments?.captures?.[0];

    if (!purchaseUnit || !paymentCapture) {
      console.error("❌ Invalid PayPal response:", capture.result);
      return res.status(500).json({ error: "Invalid PayPal response" });
    }

    const amount = Number(paymentCapture.amount.value);

    const email = payer.email_address?.toLowerCase().trim();

    if (!email) {
      return res.status(400).json({ error: "No email from PayPal" });
    }

    // ✅ Prevent duplicates
    const existing = await Donation.findOne({
      paypalOrderId: orderID
    });

    if (existing) {
      console.log("⚠️ Duplicate PayPal capture ignored");
      return res.json({ success: true });
    }

    // ✅ Save donation
    const savedDonation = await Donation.create({
      donationNumber: await generateDonationNumber(),

      name: `${payer.name?.given_name || ""} ${payer.name?.surname || ""}`.trim() || "Friend",
      email,

      amount: Number(amount),
      donationType: "payment",
      currency: "usd",

      paypalOrderId: orderID,

      paymentStatus: "paid",
      source: "paypal",
      paymentProvider: "paypal",

      emailSequenceStage: 1
    });

    console.log("💾 PayPal donation saved:", email);

    /* =============================
       IMMEDIATE EMAIL
    ============================= */
    try {
      const alreadySent = await Donation.exists({
        email,
        immediateEmailSent: true
      });

      if (!alreadySent) {

        await sendImmediateImpactEmail(
          savedDonation.name,
          email,
          savedDonation.amount
        );

        await Donation.updateMany(
          { email },
          { immediateEmailSent: true }
        );

        console.log("🔥 Immediate email sent (PayPal)");
      }

    } catch (err) {
      console.error("❌ Immediate email error:", err);
    }

    /* =============================
       RECEIPT
    ============================= */
    try {
      await sendReceipt({
        email,
        amount: savedDonation.amount,
        donationId: savedDonation.donationNumber,
        name: savedDonation.name,
        address: "N/A"
      });

      console.log("📧 Receipt sent (PayPal)");
    } catch (err) {
      console.error("❌ Receipt error:", err);
    }

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Capture failed" });
  }
});

app.get("/paypal-order/:orderID", async (req, res) => {
  try {
    const { orderID } = req.params;

    const donation = await Donation.findOne({
      paypalOrderId: orderID,
      paymentStatus: "paid"
    });

    if (!donation) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      donation
    });

  } catch (err) {
    console.error("PayPal fetch error:", err);
    res.status(500).json({ success: false });
  }
});

/* ==============================
   CREATE CHECKOUT SESSION
============================== */

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, donationType } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      mode: donationType === "monthly" ? "subscription" : "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shoova Donation",
            },
            unit_amount: amount * 100,
            recurring:
              donationType === "monthly"
                ? { interval: "month" }
                : undefined,
          },
          quantity: 1,
        },
      ],

      success_url: "https://www.shoovainitiative.org/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://www.shoovainitiative.org/donate",
    });

    res.json({ url: session.url });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Stripe session error" });
  }
});

app.get("/api/verify-session/:id", async (req, res) => {
  try {
    const donation = await Donation.findOne({
      stripeSessionId: req.params.id,
      paymentStatus: "paid",
    });

    if (!donation) {
      return res.json({ success: false });
    }

    res.json({ success: true, donation });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/admin/dashboard", verifyAdmin, async (req, res) => {
  try {

    const totalRaised = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalDonors = await Donation.distinct("email");

    const monthlyDonors = await Donation.countDocuments({
      donationType: "subscription"
    });

    const oneTimeDonors = await Donation.countDocuments({
      donationType: "payment"
    });

    const avgDonation = await Donation.aggregate([
      { $group: { _id: null, avg: { $avg: "$amount" } } }
    ]);

    const recentDonations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const topDonors = await Donation.aggregate([
      {
        $group: {
          _id: "$email",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalRaised: totalRaised[0]?.total || 0,
      totalDonors: totalDonors.length,
      monthlyDonors,
      oneTimeDonors,
      averageDonation: avgDonation[0]?.avg || 0,
      recentDonations,
      topDonors
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Dashboard error" });
  }
});

app.get("/admin/donations", verifyAdmin, async (req, res) => {

  const donations = await Donation.find()
    .sort({ createdAt: -1 });

  res.json(donations);

});

app.get("/admin/donors", verifyAdmin, async (req, res) => {
  try {

    const donors = await Donation.aggregate([
      {
        $group: {
          _id: "$email",

          name: { $first: "$name" },
          email: { $first: "$email" },

          totalDonated: { $sum: "$amount" },
          donationCount: { $sum: 1 },

          lastDonation: { $max: "$createdAt" },

          country: { $first: "$country" }
        }
      },

      { $sort: { totalDonated: -1 } }

    ]);

    res.json(donors);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Donor fetch error" });
  }
});

app.get("/admin/recent-donations", verifyAdmin, async (req, res) => {
  try {
    const recent = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name email amount country donationType createdAt");

    res.json(recent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Recent donations fetch error" });
  }
});

app.get("/admin/analytics", verifyAdmin, async (req, res) => {
  try {

    /* =============================
       DONATIONS BY MONTH
    ============================= */

    const donationsByMonth = await Donation.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    /* =============================
       DONATION TYPES
    ============================= */

    const donationTypes = await Donation.aggregate([
      {
        $group: {
          _id: "$donationType",
          total: { $sum: "$amount" }
        }
      }
    ]);

    /* =============================
       TOP DONORS
    ============================= */

    const topDonors = await Donation.aggregate([
      {
        $group: {
          _id: "$email",
          name: { $first: "$name" },
          totalDonated: { $sum: "$amount" },
          donationsCount: { $sum: 1 }
        }
      },
      { $sort: { totalDonated: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      donationsByMonth,
      donationTypes,
      topDonors
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analytics error" });
  }
});

app.get("/admin/settings", verifyAdmin, async (req, res) => {

  let settings = await Settings.findOne();

  if (!settings) {

    settings = await Settings.create({
      organizationName: "Shoova Restoration Initiative",
      contactEmail: "info@shoova.org",
      currency: "USD",
      donationTiers: [25, 100, 500, 1000, 2500, 5000]
    });

  }

  res.json(settings);

});

app.post("/admin/settings", verifyAdmin, async (req, res) => {

  try {

    const settings = await Settings.findOneAndUpdate(
      {},
      req.body,
      { returnDocument: "after", upsert: true }
    );

    res.json(settings);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Settings update failed" });

  }

});

app.post("/admin/login", async (req, res) => {
  console.log("🔥 LOGIN ROUTE HIT");
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    console.log("---- LOGIN DEBUG ----");
    console.log("INPUT EMAIL:", normalizedEmail);
    console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);
    console.log("INPUT PASSWORD:", password);

    if (normalizedEmail !== process.env.ADMIN_EMAIL.toLowerCase()) {
      console.log("❌ EMAIL MISMATCH");
      return res.status(403).json({ message: "Not authorized" });
    }

    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      console.log("❌ ADMIN NOT FOUND");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("STORED HASH:", admin.password);

    const match = await bcrypt.compare(password.trim(), admin.password);
    console.log("PASSWORD MATCH:", match);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 GENERATE OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.otp = await bcrypt.hash(otp, 10);
    admin.otpExpire = Date.now() + 5 * 60 * 1000;

    await admin.save();

    await sendEmail(
      admin.email,
      "Shoova Admin OTP",
      `<p>Your login code is <strong>${otp}</strong>. It expires in 5 minutes.</p>`
    );

    return res.json({
      message: "OTP sent",
      email: admin.email
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/admin/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin || !admin.otp || !admin.otpExpire) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (admin.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const valid = await bcrypt.compare(otp, admin.otp);

    if (!valid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🔥 CLEAR OTP
    admin.otp = undefined;
    admin.otpExpire = undefined;
    await admin.save();

    // 🔥 NOW generate token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, email: admin.email });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/admin/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 🔥 Optional: prevent spam (wait 30s before resend)
    if (admin.otpExpire && admin.otpExpire > Date.now() + 4.5 * 60 * 1000) {
      return res.status(429).json({ message: "Please wait before requesting another OTP" });
    }

    // 🔥 Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.otp = await bcrypt.hash(otp, 10);
    admin.otpExpire = Date.now() + 5 * 60 * 1000;

    await admin.save();

    // 🔥 Send email
    await sendEmail(
      admin.email,
      "Shoova Admin OTP (Resent)",
      `<p>Your new login code is <strong>${otp}</strong>. It expires in 5 minutes.</p>`
    );

    res.json({ message: "OTP resent successfully" });

  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
});




app.post("/admin/forgot-password", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();

    const admin = await Admin.findOne({ email });

    // 🔐 Always return same response (prevents email guessing)
    if (!admin) {
      return res.json({ message: "If email exists, reset link sent" });
    }

    // 🔥 Invalidate previous tokens
    admin.resetToken = undefined;
    admin.resetTokenExpire = undefined;

    // 🔥 Generate new token
    const token = crypto.randomBytes(32).toString("hex");

    admin.resetToken = token;
    admin.resetTokenExpire = Date.now() + 1000 * 60 * 15; // 15 mins

    await admin.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // ✅ Send email using your existing setup
    await sendEmail(
      admin.email,
      "Reset your admin password",
      `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Password Reset</h2>
          <p>You requested to reset your admin password.</p>

          <a href="${resetLink}" 
             style="display:inline-block;padding:10px 20px;background:#16a34a;color:white;text-decoration:none;border-radius:5px;">
             Reset Password
          </a>

          <p>This link expires in 15 minutes.</p>
        </div>
      `
    );

    res.json({ message: "Reset link sent" });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Error sending reset email" });
  }
});

app.post("/admin/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;

    const admin = await Admin.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    admin.password = await bcrypt.hash(password.trim(), 10);
    admin.resetToken = undefined;
    admin.resetTokenExpire = undefined;

    await admin.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
});


app.get("/admin/receipt/:id", verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    // 🔥 ALWAYS use donationNumber
    const donation = await Donation.findOne({
      donationNumber: id
    });

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    const receiptPath = path.join(
      process.cwd(),
      "receipts",
      `receipt-${donation.donationNumber}.pdf`
    );

    if (!fs.existsSync(receiptPath)) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.download(receiptPath);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Download failed" });
  }
});

app.post("/admin/resend-receipt/:id", verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    const donation = await Donation.findOne({
      donationNumber: id
    });

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    await sendReceipt({
      email: donation.email,
      amount: donation.amount,
      donationId: donation.donationNumber,
      name: donation.name,
      address: donation.address
    });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Resend failed" });
  }
});
app.get("/admin/donor/:email", verifyAdmin, async (req, res) => {

  try {

    const email = req.params.email;

    const donations = await Donation.find({ email })
      .sort({ createdAt: -1 });

    const stats = await Donation.aggregate([
      { $match: { email } },
      {
        $group: {
          _id: "$email",
          totalDonated: { $sum: "$amount" },
          donationsCount: { $sum: 1 },
          firstDonation: { $min: "$createdAt" },
          lastDonation: { $max: "$createdAt" }
        }
      }
    ]);

    res.json({
      donor: stats[0],
      donations
    });

  } catch (error) {

    res.status(500).json({ error: "Donor fetch error" });

  }

});
app.use("/newsletter-send", newsletterSendRoutes);

app.use("/newsletter", newsletterRoutes);
app.use("/draft", draftRoutes);
app.use("/engagement", engagementRoutes);
app.use("/api", contactRoutes);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("⚠️ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    /* =============================
       ONLY HANDLE CHECKOUT COMPLETION
    ============================= */
    if (event.type !== "checkout.session.completed") {
      return res.json({ received: true });
    }

    const session = event.data.object;

    try {

      /* =============================
         PREVENT DUPLICATES
      ============================= */
      const existingDonation = await Donation.findOne({
        stripeSessionId: session.id
      }).lean();

      if (existingDonation) {
        console.log("⚠️ Duplicate webhook ignored:", session.id);
        return res.json({ received: true });
      }

      /* =============================
         GET EMAIL (REQUIRED)
      ============================= */
      const donorEmailRaw = session.customer_details?.email;

      if (!donorEmailRaw) {
        console.log("❌ No email from Stripe session — skipping");
        return res.json({ received: true });
      }

      const donorEmail = donorEmailRaw.toLowerCase().trim();

      /* =============================
         BUILD ADDRESS
      ============================= */
      const addressObj = session.customer_details?.address;

      const fullAddress = addressObj
        ? [
          addressObj.line1,
          addressObj.line2,
          addressObj.city,
          addressObj.state,
          addressObj.postal_code,
          addressObj.country
        ].filter(Boolean).join(", ")
        : "N/A";

      /* =============================
         CREATE DONATION
      ============================= */
      const donationNumber = await generateDonationNumber();

      const savedDonation = await Donation.create({
        donationNumber,
        name: session.customer_details?.name || "Friend",
        email: donorEmail,
        amount: (session.amount_total || 0) / 100,
        donationType: session.mode,
        currency: session.currency,
        stripeSessionId: session.id,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        paymentStatus: session.payment_status,
        address: fullAddress,
        country: addressObj?.country,
        city: addressObj?.city,
        source: "website",
        paymentProvider: "stripe",
        emailSequenceStage: 1

      });

      console.log("💾 Donation saved:", donorEmail);

      /* =============================
         IMMEDIATE EMAIL (FIRST-TIME ONLY)
      ============================= */
      try {

        const alreadySent = await Donation.exists({
          email: donorEmail,
          immediateEmailSent: true
        });

        if (!alreadySent) {

          console.log("🔥 Sending first-time donor email:", donorEmail);

          await sendImmediateImpactEmail(
            savedDonation.name,
            donorEmail,
            savedDonation.amount,
            savedDonation.city,
            savedDonation.country
          );

          await Donation.updateMany(
            { email: donorEmail },
            { immediateEmailSent: true }
          );

          console.log("✅ Immediate email marked for donor");

        } else {
          console.log("ℹ️ Already sent immediate email before");
        }

      } catch (err) {
        console.error("❌ Immediate email error:", err);
      }

      /* =============================
         RECEIPT EMAIL (ALWAYS)
      ============================= */
      try {

        await sendReceipt({
          email: donorEmail,
          amount: savedDonation.amount,
          donationId: savedDonation.donationNumber,
          name: savedDonation.name,
          address: savedDonation.address
        });

        console.log("📧 Receipt email sent");

      } catch (err) {
        console.error("❌ Receipt email failed:", err);
      }

      console.log("🎉 Donation processing complete");

    } catch (error) {
      console.error("❌ MongoDB or processing error:", error);
    }


    return res.json({ received: true });
  }
);


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
