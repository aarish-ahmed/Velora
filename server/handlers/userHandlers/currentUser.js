import User from "../../models/userModel.js";
const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("email username");
 
  if(!user){
    return res.status(400).json({
        message:'user is not logged in'
    })
  }
  return res.status(200).json(user)
};
export default getCurrentUser;
