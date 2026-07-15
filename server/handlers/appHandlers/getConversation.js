import Conversation from "../../models/conversationModel.js";

const getConversationHandler = async (req, res) => {
   try {
     const userId=req.user.id
    const getAllConversation=await Conversation.find({users:{$in:userId}}).sort({ lastMessageAt: -1 }).populate('users','username').populate('lastMessage')
    if(getAllConversation.length===0){
        return res.status(400).json({
            message:'No conversation yet'
        })
    }
   
    return res.status(200).json(getAllConversation)
   } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "Internal Server Error",
    });
   }
};
export default getConversationHandler