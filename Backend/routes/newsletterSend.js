import express from "express";
import Subscriber from "../models/subscriberModel.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { subject, html } = req.body;

    const subscribers = await Subscriber.find();

    console.log("📧 Sending to:", subscribers.length, "subscribers");

    await Promise.all(
      subscribers.map(async (sub) => {
        try {
          const personalizedHTML = html.replace(
            "{{EMAIL}}",
            encodeURIComponent(sub.email)
          );

          console.log("➡️ Sending to:", sub.email);

          await sendEmail(sub.email, subject, personalizedHTML);

          console.log("✅ Sent to:", sub.email);

        } catch (err) {
          console.error("❌ Failed for:", sub.email, err.message);
          throw err; 
        }
      })
    );

    res.json({ success: true });

  } catch (err) {
    console.error(" NEWSLETTER ERROR:", err);
    res.status(500).json({ success: false, error: "Newsletter failed" });
  }
});

export default router;