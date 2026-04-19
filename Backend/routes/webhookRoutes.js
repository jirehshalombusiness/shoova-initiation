// import express from "express";
// import Stripe from "stripe";
// import Donation from "../models/Donation.js";
// import generateDonationNumber from "../utils/generateDonationNumber.js";
// import { sendImmediateImpactEmail } from "../utils/sendImmediateImpactEmail.js";
// import { sendReceipt } from "../utils/sendReceipt.js";

// const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // 🔥 IMPORTANT: raw parser ONLY here
// router.post(
//   "/",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.log("⚠️ Webhook signature verification failed:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     /* =============================
//        ONLY HANDLE CHECKOUT COMPLETION
//     ============================= */
//     if (event.type !== "checkout.session.completed") {
//       return res.json({ received: true });
//     }

//     const session = event.data.object;

//     try {

//       /* =============================
//          PREVENT DUPLICATES
//       ============================= */
//       const existingDonation = await Donation.findOne({
//         stripeSessionId: session.id
//       }).lean();

//       if (existingDonation) {
//         console.log("⚠️ Duplicate webhook ignored:", session.id);
//         return res.json({ received: true });
//       }

//       /* =============================
//          GET EMAIL (REQUIRED)
//       ============================= */
//       const donorEmailRaw = session.customer_details?.email;

//       if (!donorEmailRaw) {
//         console.log("❌ No email from Stripe session — skipping");
//         return res.json({ received: true });
//       }

//       const donorEmail = donorEmailRaw.toLowerCase().trim();

//       /* =============================
//          BUILD ADDRESS
//       ============================= */
//       const addressObj = session.customer_details?.address;

//       const fullAddress = addressObj
//         ? [
//             addressObj.line1,
//             addressObj.line2,
//             addressObj.city,
//             addressObj.state,
//             addressObj.postal_code,
//             addressObj.country
//           ].filter(Boolean).join(", ")
//         : "N/A";

//       /* =============================
//          CREATE DONATION
//       ============================= */
//       const donationNumber = await generateDonationNumber();

//       const savedDonation = await Donation.create({
//         donationNumber,
//         name: session.customer_details?.name || "Friend",
//         email: donorEmail,
//         amount: (session.amount_total || 0) / 100,
//         donationType: session.mode,
//         currency: session.currency,
//         stripeSessionId: session.id,
//         stripeCustomerId: session.customer,
//         stripeSubscriptionId: session.subscription,
//         paymentStatus: session.payment_status,
//         address: fullAddress,
//         country: addressObj?.country,
//         city: addressObj?.city,
//         source: "website",
//         paymentProvider: "stripe",
//         emailSequenceStage: 1
//       });

//       console.log("💾 Donation saved:", donorEmail);

//       /* =============================
//          IMMEDIATE EMAIL (FIRST-TIME ONLY)
//       ============================= */
//       try {
//         const alreadySent = await Donation.exists({
//           email: donorEmail,
//           immediateEmailSent: true
//         });

//         if (!alreadySent) {

//           console.log("🔥 Sending first-time donor email:", donorEmail);

//           await sendImmediateImpactEmail(
//             savedDonation.name,
//             donorEmail,
//             savedDonation.amount,
//             savedDonation.city,
//             savedDonation.country
//           );

//           // Mark ALL donations from this email
//           await Donation.updateMany(
//             { email: donorEmail },
//             { immediateEmailSent: true }
//           );

//           console.log("✅ Immediate email marked for donor");

//         } else {
//           console.log("ℹ️ Already sent immediate email before");
//         }

//       } catch (err) {
//         console.error("❌ Immediate email error:", err);
//       }

//       /* =============================
//          RECEIPT EMAIL (ALWAYS)
//       ============================= */
//       try {
//         await sendReceipt({
//           email: donorEmail,
//           amount: savedDonation.amount,
//           donationId: savedDonation.donationNumber,
//           name: savedDonation.name,
//           address: savedDonation.address
//         });

//         console.log("📧 Receipt email sent");

//       } catch (err) {
//         console.error("❌ Receipt email failed:", err);
//       }

//       console.log("🎉 Donation processing complete");

//     } catch (error) {
//       console.error("❌ MongoDB or processing error:", error);
//     }

//     return res.json({ received: true });
//   }
// );

// export default router;