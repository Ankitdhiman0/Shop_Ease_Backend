const OTP = require("../models/otpModel");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports.requestOtp = async (req, res) => {
  try {
    const { email, purpose } = req.body;

    if (!email || !purpose) {
      return res
        .status(400)
        .json({ message: "Email and purpose are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    console.log("Generated OTP:", otp);

    const hashedOtp = await bcrypt.hash(otp, 10);

    await OTP.deleteMany({ email, purpose });

    await OTP.create({
      email,
      otp: hashedOtp,
      purpose,
      expiredAt: Date.now() + 5 * 60 * 1000,
    });

    const mailSent = await sendMail(email, otp);

    if (!mailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    } else {
      return res
        .status(200)
        .json({ message: "OTP sent successfully to your email" });
    }
  } catch (error) {
    console.error("Error in requestOtp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp, purpose } = req.body;

    if (!email || !otp || !purpose) {
      return res
        .status(400)
        .json({ message: "Email, OTP and purpose are required" });
    }

    const record = await OTP.findOne({ email, purpose, isVerified: false });

    if (!record) {
      return res
        .status(400)
        .json({ message: "No OTP request found, please request OTP first" });
    }

    if (record.expiredAt < Date.now()) {
      await OTP.deleteMany({ email, purpose });
      return res.status(400).json({ message: "OTP has expired" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const isMatch = await bcrypt.compare(otp, record.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    record.isVerified = true;
    await record.save();

    res.status(200).json({
      message: "OTP verified successfully",
      verified: true,
    });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
