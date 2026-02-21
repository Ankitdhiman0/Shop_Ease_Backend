const OTP = require("../models/otpModel");

module.exports.requireOtpVerified = (allowedpurpose) => {
  return async (req, res, next) => {
    try {
      const email =
        req.body.email ||
        req.query.email ||
        req.params.email ||
        (req.user && req.user.email);

      if (!email) {
        return res
          .status(400)
          .json({ message: "Email is required for OTP verification" });
      }

      const record = await OTP.findOne({
        email,
        purpose: { $in: allowedpurpose },
        isVerified: true,
        expiredAt: { $gt: Date.now() },
      });

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
