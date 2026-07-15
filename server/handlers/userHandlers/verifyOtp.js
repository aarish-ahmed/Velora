import User from "../../models/userModel.js";

const verifyOtpHandler = async (req, res) => {
  try {
    const { email, verificationCode, purpose } = req.body;
    const veriCode = Number(verificationCode);
    const user = await User.findOne({ email: email });
    console.log(email, veriCode, purpose);
   
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    if (purpose === "verify" && user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified. Please login.",
      });
    }
    if (user.verificationExpires < new Date()) {
      return res.status(400).json({
        message: "verification code expired",
      });
    }
    if (user.verificationCode !== veriCode) {
      return res.status(409).json({
        message: "wrong verification code",
      });
    }
    if (purpose === "verify") {
      user.isVerified = true;
    }

    user.verificationCode = null;
    user.verificationExpires = null;
    if (purpose === "reset") {
      user.resetPasswordVerified = true;
    }
    await user.save();
    return res.status(200).json({
      message: " verification successful,please login",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default verifyOtpHandler;
