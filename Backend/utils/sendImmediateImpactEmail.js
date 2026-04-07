import { sendEmail } from "./sendEmail.js";

export const sendImmediateImpactEmail = async (name, email, amount, city, country) => {

    const firstName = name?.split(" ")[0] || "Friend";

    let subject = "";

    if (amount >= 1000) {
        subject = `${firstName}, you're building something lasting`;
    } else if (amount >= 500) {
        subject = `${firstName}, you're shaping a future`;
    } else if (amount >= 100) {
        subject = `${firstName}, you just changed a life`;
    } else {
        subject = `${firstName}, your impact has started`;
    }

    const location =
        city || country
            ? ` from ${city || country}`
            : "";

    const impactMessage =
        amount >= 1000
            ? "helping fund critical infrastructure for the Shoova Restoration Campus."
            : amount >= 500
                ? "supporting a full phase of student training and restoration work."
                : amount >= 100
                    ? "equipping a young person with tools to transition from galamsey."
                    : "contributing to the restoration of land and opportunity.";

 const html = `
  <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:40px 0;">
    
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <!-- HERO IMAGE -->
      <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
           style="width:100%;height:220px;object-fit:cover;" />

      <!-- CONTENT -->
      <div style="padding:30px;">
        
        <h2 style="margin:0 0 10px;color:#111;font-size:22px;">
          ${firstName}, you're shaping a future
        </h2>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          I wanted to personally thank you ${location}.
        </p>

        <p style="color:#333;font-size:16px;line-height:1.6;">
          Your gift of <strong>$${amount}</strong> has just been received — and it is already <strong>${impactMessage}</strong>
        </p>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          Because of you, a young person in Ghana’s Eastern Region is one step closer to choosing a future of engineering, restoration, and leadership.
        </p>

        <!-- HIGHLIGHT BOX -->
        <div style="background:#F4F8F6;border-left:4px solid #1B5E20;padding:16px;margin:25px 0;border-radius:6px;">
          <strong style="color:#1B5E20;">You are not just a donor.</strong><br/>
          <span style="font-size:15px;color:#333;">You are a Co-Restorer.</span>
        </div>

        <p style="color:#555;font-size:15px;line-height:1.6;">
          We are currently preparing the foundation for our 8-acre Restoration Campus, and your support is now part of that story.
        </p>

        <!-- CTA BUTTON -->
        <div style="text-align:center;margin:30px 0;">
          <a href="https://www.shoovainitiative.org"
             style="background:#D4AF37;color:#000;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
             See the Impact You're Creating
          </a>
        </div>

        <p style="color:#777;font-size:14px;">
          With gratitude,<br/><br/>
          <strong>William Agyekum</strong><br/>
          President, The Shoova Initiative
        </p>

      </div>

      <!-- FOOTER -->
     <div style="background:#111;color:#aaa;padding:20px;text-align:center;font-size:12px;">
  Shoova Restoration Initiative<br/>
  Restoring land. Rebuilding lives.<br/><br/>

  Shoova Initiative Corporation is a 501(c)(3) public charity dedicated to restoring lands and lives in Ghana.<br/>
  Public Charity Status: 170(b)(1)(A)(vi)
</div>

    </div>
  </div>
`;

    await sendEmail(email, subject, html);
};