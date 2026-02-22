const OTP = require("../models/otpModel");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports.requestOtp = async (req, res) => {
  try {
    let { email, purpose } = req.body;

    if (!email || !purpose) {
      return res
        .status(400)
        .json({ message: "Email and purpose are required" });
    }

    email = email.toLowerCase().trim();

    const allowedPurposes = ["register", "login", "reset_password"];

    if (!allowedPurposes.includes(purpose)) {
      return res.status(400).json({ message: "Invalid purpose" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingRecord = await OTP.findOne({ email, purpose });

    const WINDOW_TIME = 10 * 60 * 1000; //10 minutes
    const MAX_REQUESTS = 5;

    if (existingRecord) {
      const now = Date.now();
      const windowStart = existingRecord.firstRequestAt.getTime();

      if (now - windowStart < WINDOW_TIME) {
        if (existingRecord.requestCount >= MAX_REQUESTS) {
          return res.status(429).json({
            message: "Too many OTP requests. Please try again later.",
          });
        }

        existingRecord.requestCount += 1;
        await existingRecord.save();

        return res.status(429).json({
          message: "OTP already sent. Please wait.",
        });
      } else {
        existingRecord.requestCount = 1;
        existingRecord.firstRequestAt = new Date();
        existingRecord.attempts = 0;
        existingRecord.isVerified = false;
        await existingRecord.save();
      }
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.deleteMany({ email, purpose });

    const newOtp = await OTP.create({
      email,
      otp: otpHash,
      purpose,
      expiresAt,
      requestCount: 1,
      firstRequestAt: new Date(),
    });

    if (!newOtp) {
      return res.status(500).json({ message: "Failed to create OTP record" });
    }

    const mailSent = await sendMail(email, otp);

    if (!mailSent) {
      await OTP.deleteMany({ email, purpose });
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in requestOtp:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
