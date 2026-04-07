import { Resend } from "resend";
import fs from "fs";
import generateReceipt from "./generateReceipt.js";


export const sendReceipt = async ({
  email,
  amount,
  donationId,
  name,
  address = "N/A"
}) => {
  try {
    /* =========================
    VALIDATION
    ========================= */
    if (!email || !amount || !donationId) {
      throw new Error("Missing required donation fields");
    }
   

    const firstName = name?.split(" ")[0] || "Supporter";

    /* =========================
       GENERATE RECEIPT PDF (WAIT!)
    ========================= */
    const receiptPath = await generateReceipt({
      _id: donationId,
      email,
      name,
      address,
      amount,
      donationType: "donation",
      createdAt: new Date()
    });
     const resend = new Resend(process.env.RESEND_API_KEY);
    console.log("RESEND KEY:", process.env.RESEND_API_KEY);

    const fileBuffer = fs.readFileSync(receiptPath);

    const formattedAmount = Number(amount).toLocaleString();

    /* =========================
       SEND EMAIL (RESEND)
    ========================= */
    await resend.emails.send({
      from: "Shoova Initiative <noreply@email.shoovainitiative.org>",
      to: email,
      subject: "Your Official Donation Receipt – Shoova Initiative",

      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">

          <h2>Thank you for your support</h2>

          <p>Dear ${firstName},</p>

          <p>
            We sincerely appreciate your generous contribution of 
            <strong>$${formattedAmount}</strong> to the Shoova Initiative.
          </p>

          <p>
            Your support is directly helping restore degraded lands and 
            empower the next generation.
          </p>

          <hr/>

          <h3>Donation Summary</h3>

          <p><strong>Donation ID:</strong> ${donationId}</p>
          <p><strong>Amount:</strong> $${formattedAmount}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

          <p>
            Please find your official donation receipt attached.
          </p>

          <br/>

          <p>
            Shoova Initiative
          </p>

        </div>
      `,

      attachments: [
        {
          filename: `Shoova-Receipt-${donationId}.pdf`,
          content: fileBuffer,
          contentType: "application/pdf"
        }
      ]
    });

    console.log("📧 Receipt email sent via Resend");

    return { success: true };

  } catch (error) {
    console.error("❌ Resend error:", error.message);

    return {
      success: false,
      error: error.message
    };
  }
};
