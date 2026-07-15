import User from "../../models/userModel.js";
import bcrypt from 'bcrypt'
const resetPasswordHandler = async (req, res) => {
    try {
    const {email,password}=req.body
    const findUser=await User.findOne({
        email:email
    })
  
    if(!findUser){
        return res.json({
            message:'no user found'
        })
    }
    if(!findUser.resetPasswordVerified){
        return res.status(400).json({
            message:'otp verification required'
        })
    }
    const hashedPassword=await bcrypt.hash(password,10)
    findUser.password=hashedPassword;
    findUser.resetPasswordVerified = false;
    await findUser.save()
   
    return res.status(200).json({
        message:'reset password successful,please login'
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
export default resetPasswordHandler