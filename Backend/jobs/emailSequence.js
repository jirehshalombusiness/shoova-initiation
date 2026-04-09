import cron from "node-cron";
import Donation from "../models/Donation.js";
import { sendHumanConnectionEmail } from "../utils/sendHumanConnectionEmail.js";
import { sendEngagementEmail } from "../utils/sendEngagementEmail.js";

cron.schedule("0 9 * * *", async () => {

  console.log("🕘 Running donor email sequence job...");

  const donations = await Donation.find({
    emailSequenceStage: { $in: [1, 2] }
  }).lean();

  for (const donation of donations) {

    if (!donation.email) continue;

    const daysSinceDonation = Math.floor(
      (Date.now() - new Date(donation.createdAt)) / (1000 * 60 * 60 * 24)
    );

    try {

      // ✅ DAY 3 EMAIL
      if (donation.emailSequenceStage === 1 && daysSinceDonation >= 3) {

        await sendHumanConnectionEmail(donation.name, donation.email);

        await Donation.updateOne(
          { _id: donation._id },
          { emailSequenceStage: 2 }
        );

        console.log("📧 Day 3 email sent:", donation.email);
      }

      // ✅ DAY 7 EMAIL
      else if (donation.emailSequenceStage === 2 && daysSinceDonation >= 7) {

        await sendEngagementEmail(donation.name, donation.email);

        await Donation.updateOne(
          { _id: donation._id },
          { emailSequenceStage: 3 }
        );

        console.log("📧 Day 7 email sent:", donation.email);
      }

    } catch (err) {
      console.error("❌ Email sequence error:", err);
    }

  }

}, {
  timezone: "America/Chicago"
});