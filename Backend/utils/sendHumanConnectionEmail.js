import { sendEmail } from "./sendEmail.js";

export const sendHumanConnectionEmail = async (name, email) => {

  const firstName = name?.split(" ")[0] || "Friend";

  const subject = "Meet the hands behind the restoration";

  const html = `
  <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:40px 0;">
    
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <!-- IMAGE -->
      <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
           style="width:100%;height:220px;object-fit:cover;" />

      <!-- CONTENT -->
      <div style="padding:30px;">
        
        <h2 style="margin:0 0 10px;color:#111;">
          ${firstName}, meet the people behind your impact
        </h2>

        <p style="color:#555;line-height:1.6;">
          A few days ago, you made a powerful decision to support this mission.
        </p>

        <p style="color:#333;line-height:1.6;">
          I wanted to personally introduce myself — I’m <strong>Salome</strong>, the Treasurer at Shoova.
        </p>

        <p style="color:#555;line-height:1.6;">
          As a Chartered Accountant, I see the numbers.  
          But as a Ghanaian, I see something deeper — the people behind them.
        </p>

        <!-- HIGHLIGHT -->
        <div style="background:#F4F8F6;border-left:4px solid #1B5E20;padding:16px;margin:25px 0;border-radius:6px;">
          Behind every donation is a young person with potential —  
          a future engineer, builder, or leader waiting for opportunity.
        </div>

        <p style="color:#555;line-height:1.6;">
          Because of your support, we hold ourselves to a higher standard —  
          not just in what we build, but in how we steward every dollar.
        </p>

        <p style="color:#555;line-height:1.6;">
          We take that responsibility seriously.
        </p>

        <p style="color:#555;line-height:1.6;">
          Your gift is not just funding a project —  
          it is helping us build something that will last.
        </p>

        <p style="margin-top:25px;color:#777;">
          Warm regards,<br/><br/>
          <strong>Salome Agyekum</strong><br/>
          Treasurer, The Shoova Initiative
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