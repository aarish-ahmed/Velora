import User from "../../models/userModel.js";
import sendEmail from "../../utils/sendEmail.js";

export const sendOtpHandler = async (email) => {
  const findUser = await User.findOne({
    email: email,
  });
  if (!findUser) {
    return res.status(404).json({
      message: "No user found",
    });
  }
  const verificationCode = Math.floor(10000 + Math.random() * 900000).toString()
  const verificationExpires = new Date(Date.now() + 2 * 60 * 1000);
  findUser.verificationCode = verificationCode;
  findUser.verificationExpires = verificationExpires;
  await findUser.save();
 
  await sendEmail(email, verificationCode);
  
};



export const callSendOtpHandler = async (req, res) => {
    const {email}=req.body
    console.log(email)
    console.log('send otp called')
    await sendOtpHandler(email)
    return res.status(200).json({
    message:'otp sent'
  })
  
};
export default callSendOtpHandler