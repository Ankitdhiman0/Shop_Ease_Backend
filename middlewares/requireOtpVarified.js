const OTP = require("../models/otpModel");
const bcrypt = require("bcrypt");

module.exports.requireOtpVerified = async (req, res, next) => {
  try {
    let { email, purpose, otp } = req.body;

    if (!email || !purpose || !otp) {
      return res
        .status(400)
        .json({ message: "Email, OTP and purpose are required" });
    }

    email = email.toLowerCase().trim();

    const record = await OTP.findOne({ email, purpose });

    if (!record) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (record.attempts >= 5) {
      return res.status(429).json({
        message: "Too many failed OTP attempts. Please request a new OTP.",
      });
    }

    if (record.isVerified) {
      return res.status(400).json({ message: "OTP already used" });
    }

    const isMatch = await bcrypt.compare(otp, record.otp);

    if (!isMatch) {
      record.attempts += 1;
      await record.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    record.isVerified = true;
    await record.save();

    req.verifiedEmail = email;
    next();
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};
