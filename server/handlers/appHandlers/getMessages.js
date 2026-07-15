import Conversation from "../../models/conversationModel.js";
import Message from "../../models/messageModel.js";
import User from '../../models/userModel.js'
import io from "../../server.js";

const getMessagesHandler = async (req, res) => {
    try {
        
    const conversation=req.params.conversationId
    const findConversation=await Conversation.findById(conversation)
    const receiverId=await findConversation.users.find((user)=>user._id.toString()!==req.user.id)
    const receiver=await User.findById(receiverId)
    const receiverName=receiver.username
    
    if(!findConversation){
        return res.status(400).json({
            message:'No conversation found'
        })
    }
    await Message.updateMany(
        {
           conversation:conversation,
           sender:{$ne:req.user.id},
           readBy:{$ne:req.user.id},
        },
        {
            $push:{readBy:req.user.id}
        }
    )
    io.to(req.user.id).emit("conversation-updated");
    const getAllMessage=await Message.find({conversation})
    
   
    return res.status(200).json({
        messages:getAllMessage,
        receiver:receiverName
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
export default getMessagesHandler