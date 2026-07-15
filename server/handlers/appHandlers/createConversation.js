import Conversation from "../../models/conversationModel.js";

const createConversationHandler = async (req, res) => {
    try {
        const loggedInUser=req.user.id
    const otherUser=req.params.receiverId
    const users=[loggedInUser,otherUser]

    const findConversation=await Conversation.findOne({users:{$all:users}})
    if(findConversation){
        return res.status(200).json(findConversation)
    }
    const newConversation=await Conversation.create({
        users:users,
        
        
    })
    return res.status(200).json(newConversation)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
export default createConversationHandler