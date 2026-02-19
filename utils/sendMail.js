const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: Number(process.env.MAIL_PORT) === 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  connectionTimeout: 10000,
});

if (process.env.NODE_ENV !== "production") {
  transporter
    .verify()
    .then(() => console.log("Mail transporter ready"))
    .catch(console.error);
}

const sendMail = async (email, otp) => {
  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
    </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155;">
       <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 32px; text-align: center;">
         <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #ffffff;">
         Verify Your Email
         </h1>
          <p style="margin: 0; font-size: 16px; color: rgba(255,255,255,0.9);">One-time code for login</p>
           </div>
            <div style="padding: 48px 32px; text-align: center;"> 
            <div style="background-color: #f1f5f9; border: 2px solid #e2e8f0; border-radius: 12px; padding: 32px; margin-bottom: 24px;"> 
            <div style="font-size: 48px; font-weight: 800; color: #1e293b; letter-spacing: 12px; font-family: 'Courier New', monospace; margin: 0;">${otp}</div>
             </div> 
             <p style="margin: 0 0 16px 0; font-size: 16px; color: #64748b;">Valid for 5 minutes.</p>
              <p style="margin: 0; font-size: 14px; color: #ef4444; font-weight: 500;">Never share your code.</p>
               </div>
                <div style="padding: 24px 32px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 14px; color: #64748b;">© 2026 Market-Mate </p> 
                </div>
                 </div>
    </body>
  </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Your OTP Code",
      html: htmlTemplate,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

module.exports = sendMail;
