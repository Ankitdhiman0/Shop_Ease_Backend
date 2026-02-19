const OTP = require("../models/otpModel");

module.exports.requireOtpVerified = (purpose) => {
  return async (req, res, next) => {
    try {
      const { email } = req.body;

      const record = await OTP.findOne({ email, purpose, isVerified: true });

      if (!record) {
        return res
          .status(403)
          .json({ message: "OTP verification required for this action" });
      }

      next();
    } catch (error) {
      console.error("Error in requireOtpVerified middleware:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
