const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendMail = async (email, otp) => {
  try {
    const response = await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.MAIL_FROM,
        name: "Shop-Ease",
      },
      to: [{ email }],
      subject: "Shop-Ease OTP Verification",
      textContent: `Your OTP for Shop-Ease verification is: ${otp}`,
      htmlContent: `
        <h2>Shop-Ease OTP</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `,
    });

    console.log("Email Sent Succesfully to", email, response.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendMail;
