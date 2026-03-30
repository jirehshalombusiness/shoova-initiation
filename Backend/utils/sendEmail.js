import { Resend } from "resend";


export const sendEmail = async (to, subject, html) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const res = await resend.emails.send({
      from: "Shoova Initiative <onboarding@resend.dev>",
      to,
      subject,
      html
    });

    console.log("📨 Email sent:", res.id);

  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
};
