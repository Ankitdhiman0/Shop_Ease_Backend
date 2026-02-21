const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
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
    .then(() => console.log("Node Mailer is ready"))
    .catch((err) => console.error("Mailer Verify Failed", err));
}

const sendMail = async (email, otp) => {
  let htmlTemplate = fs.readFileSync(
    path.join(__dirname, "otpTemplate.html"),
    "utf-8",
  );

  htmlTemplate = htmlTemplate.replace(/{OTP_CODE}/g, otp);
  htmlTemplate = htmlTemplate.replace(/{APP_NAME}/g, "Market-Mate");

  const textTemplate = `Your OTP code for Market-Mate is: ${otp}. It expires in 5 minutes. Never share this code with anyone.`;

  try {
    const info = await transporter.sendMail({
      // ✅ Fixed: Added await
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Market-Mate OTP",
      html: htmlTemplate,
      text: textTemplate,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

module.exports = sendMail;
