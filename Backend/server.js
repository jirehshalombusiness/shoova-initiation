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



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT= process.env.PORT || 5000
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

/* ==============================
   STRIPE WEBHOOK
============================== */

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
      console.log("⚠️ Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {

      const session = event.data.object;

      try {

        // Prevent duplicate webhook saves
        const existingDonation = await Donation.findOne({
          stripeSessionId: session.id
        });

        if (existingDonation) {
          console.log("⚠️ Duplicate webhook ignored");
          return res.json({ received: true });
        }

        const addressObj = session.customer_details?.address;

        const fullAddress = addressObj
          ? [
            addressObj.line1,
            addressObj.line2,
            addressObj.city,
            addressObj.state,
            addressObj.postal_code,
            addressObj.country
          ]
            .filter(Boolean)
            .join(", ")
          : "N/A";


        const donationNumber = await generateDonationNumber();

        const donation = new Donation({

          donationNumber,

          name: session.customer_details?.name || "Friend",
          email: session.customer_details?.email
            ? session.customer_details.email.toLowerCase().trim()
            : null,

          amount: session.amount_total / 100,
          donationType: session.mode,
          currency: session.currency,

          stripeSessionId: session.id,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,

          paymentStatus: session.payment_status,

          address: fullAddress, // ✅ ADD THIS

          country: addressObj?.country,
          city: addressObj?.city,

          source: "website",

          emailSequenceStage: 1
        });

        const savedDonation = await donation.save();
        try {
          const previousDonations = await Donation.countDocuments({
            email: savedDonation.email
          });

          if (savedDonation.email && previousDonations === 1) {
            await sendImmediateImpactEmail(
              savedDonation.name,
              savedDonation.email,
              savedDonation.amount,
              savedDonation.city,
              savedDonation.country
            );
          }
        } catch (err) {
          console.log("Email failed but donation saved", err);
        }

        await sendReceipt({
          email: savedDonation.email,
          amount: savedDonation.amount,
          donationId: savedDonation.donationNumber,
          name: savedDonation.name,
          address: savedDonation.address // ✅ CRITICAL
        });

        console.log("📧 Receipt email sent");

        console.log("🎉 Donation saved to database!");
        console.log(savedDonation);

      } catch (error) {
        console.error("❌ MongoDB save error:", error);
      }

    }



    res.json({ received: true });
  }
);

/* ==============================
   NORMAL JSON ROUTES
============================== */

app.use(express.json());

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

app.get("/admin/dashboard", async (req, res) => {
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

app.get("/admin/donations", async (req, res) => {

  const donations = await Donation.find()
    .sort({ createdAt: -1 });

  res.json(donations);

});

app.get("/admin/donors", async (req, res) => {
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

app.get("/admin/recent-donations", async (req, res) => {
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

app.get("/admin/analytics", async (req, res) => {
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

app.get("/admin/settings", async (req, res) => {

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

app.post("/admin/settings", async (req, res) => {

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

  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, email: admin.email });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({ error: "Server error" });

  }

});



app.get("/admin/receipt/:id", async (req, res) => {
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




app.post("/admin/resend-receipt/:id", async (req, res) => {
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
app.get("/admin/donor/:email", async (req, res) => {

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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
