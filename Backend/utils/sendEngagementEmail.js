export const sendEngagementEmail = async (name, email) => {

  const firstName = name?.split(" ")[0] || "Friend";

  const subject = `A small ask, ${firstName}`;

  const html = `
  <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:40px 0;">
    
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <!-- IMAGE -->
      <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
           style="width:100%;height:220px;object-fit:cover;" />

      <!-- CONTENT -->
      <div style="padding:30px;">
        
        <h2 style="margin:0 0 10px;color:#111;">
          ${firstName}, you're part of something bigger
        </h2>

        <p style="color:#555;line-height:1.6;">
          It’s been about a week since you joined the Shoova movement.
        </p>

        <p style="color:#333;line-height:1.6;">
          And already, your support is part of something that is growing —  
          something that is restoring land, and restoring futures.
        </p>

        <!-- HIGHLIGHT -->
        <div style="background:#F4F8F6;border-left:4px solid #D4AF37;padding:16px;margin:25px 0;border-radius:6px;">
          Movements don’t grow because of organizations.  
          They grow because people choose to share them.
        </div>

        <p style="color:#555;line-height:1.6;">
          If you’re willing, there are two small ways you can help:
        </p>

        <ul style="color:#333;line-height:1.8;padding-left:20px;">
          <li>Follow Shoova on social media</li>
          <li>Share our story with just one person</li>
        </ul>

        <p style="color:#555;line-height:1.6;">
          That single action could bring another person into this mission.
        </p>

        <!-- CTA -->
        <div style="text-align:center;margin:30px 0;">
          <a href="https://www.shoovainitiative.org"
             style="background:#D4AF37;color:#000;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
             Share the Mission
          </a>
        </div>

        <p style="color:#555;line-height:1.6;">
          When we restore land, we restore the future.
        </p>

        <p style="margin-top:25px;color:#777;">
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