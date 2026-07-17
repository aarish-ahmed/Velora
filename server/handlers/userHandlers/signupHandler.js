import bcrypt from "bcrypt";
import User from "../../models/userModel.js";
import sendEmail from "../../utils/sendEmail.js";
import { sendOtpHandler } from "./sendOtpHandler.js";

const signupHandler = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      if (!findUser.isVerified) {
        return res.status(400).json({
          message: "please verify your email",
        });
      }
      return res.status(400).json({
        message: "This email is already registered",
      });
    }

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Rollback protection: If the email fails on Render, delete the unverified user from MongoDB
    try {
      await sendOtpHandler(email);
    } catch (emailError) {
      await User.findByIdAndDelete(newUser._id);
      console.error("Email failed to send on cloud server, rolling back user creation:", emailError);
      return res.status(500).json({
        message: "Failed to send verification email. Please try again later.",
      });
    }

    return res.status(200).json({
      email: email,
      message: "signup successful",
    });
  } catch (error) {
    console.error("Signup Handler Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default signupHandler;