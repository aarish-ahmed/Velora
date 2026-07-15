import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({
      email: email,
    });
    
    if (findUser) {
      const isMatch = await bcrypt.compare(password, findUser.password);
      
      if (isMatch) {
        if(!findUser.isVerified){
          return res.status(400).json({
            message:'please verify your email'
          })
        }
        const token = jwt.sign({
          id: findUser._id,
          email: email,
          username: findUser.username,
        },
        process.env.JWT_SECRET
      );
        
        res.cookie("Token", token,{
          maxAge:2*60*60*1000,
        });
        return res.status(200).json({
          user:findUser,
          message: "login successful",
        });
      }
      return res.status(409).json({
        message: "wrong password",
      });
    }
    return res.status(409).json({
      message: "This email is not registered",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default loginHandler;
