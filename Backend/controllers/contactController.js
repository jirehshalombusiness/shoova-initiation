import { Resend } from "resend";
import sanitizeHtml from "sanitize-html";

export const sendContactEmail = async (req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { firstName, lastName, email, subject, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  // ✅ SANITIZE INPUTS
  const safeFirstName = sanitizeHtml(firstName, { allowedTags: [], allowedAttributes: {} });
  const safeLastName = sanitizeHtml(lastName || "", { allowedTags: [], allowedAttributes: {} });
  const safeEmail = sanitizeHtml(email, { allowedTags: [], allowedAttributes: {} });
  const safeSubject = sanitizeHtml(subject || "", { allowedTags: [], allowedAttributes: {} });
  const safeMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });

  try {
    await resend.emails.send({
      from: "Shoova Initiative <noreply@email.shoovainitiative.org>", // ✅ better sender
      to: process.env.CONTACT_RECEIVER_EMAIL || "info@shoovainitiative.org", 

      reply_to: safeEmail || "info@shoovainitiative.org",

      subject: `Shoova Contact: ${safeSubject || "New Inquiry"}`,

      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f4f6f8; padding: 50px 20px;">

  <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">

    <!-- HEADER -->
    <div style="padding: 24px 32px; border-bottom: 1px solid #f0f0f0;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #111;">
        New Contact Message
      </h2>
      <p style="margin: 6px 0 0; font-size: 13px; color: #888;">
        Submitted via Shoova Initiative Website
      </p>
    </div>

    <!-- CONTENT -->
    <div style="padding: 28px 32px;">

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">

        <tr>
          <td style="padding: 10px 0; color: #999; width: 130px;">Full Name</td>
          <td style="padding: 10px 0; color: #111; font-weight: 500;">
            ${safeFirstName} ${safeLastName}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 0; color: #999;">Email Address</td>
          <td style="padding: 10px 0;">
            <a href="mailto:${safeEmail}" style="color: #999; text-decoration: none; font-weight: 500;">
              ${safeEmail}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 0; color: #999;">Subject</td>
          <td style="padding: 10px 0; color: #111;">
            ${safeSubject || "—"}
          </td>
        </tr>

      </table>

      <!-- MESSAGE -->
      <div style="margin-top: 26px;">
        <p style="margin-bottom: 10px; font-size: 13px; color: #999;">
          Message
        </p>

        <div style="
          background: #fafafa;
          padding: 18px;
          border-radius: 10px;
          color: #222;
          line-height: 1.7;
          border: 1px solid #eee;
        ">
          ${safeMessage.replace(/\n/g, "<br/>")}
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="padding: 22px 32px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #999; line-height:1.6;">

      <strong style="color:#444;">Shoova Initiative</strong><br/>
      Restoring ecosystems. Empowering generations.<br/><br/>

      This message was submitted through your website contact form.

    </div>

  </div>

</div>
`
    });

    res.json({ success: true });

  } catch (error) {
    console.error("❌ Contact email error:", error);
    res.status(500).json({ success: false });
  }
};