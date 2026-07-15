import Conversation from "../../models/conversationModel.js";
import User from "../../models/userModel.js";

const getUsers = async (req, res) => {
   
         const convos=await Conversation.find({users:{$in:req.user.id}}).select('users').populate('users','username')
         const otherUser=convos.map((convo)=>{
            
            return convo.users.find((user)=>{
                return user._id.toString() !== req.user.id
            })
         })
         const otherUserIds=otherUser.map((user)=>user._id)
         const UnknownsUsers=await User.find({
            _id:{
                $nin:[...otherUserIds,req.user.id]
            },
            isVerified:true,
         }).select('username')
        
        
         return res.status(200).json(UnknownsUsers)
};
export default getUsers