import Conversation from "../../models/conversationModel.js";
import Message from "../../models/messageModel.js";
import io from "../../server.js";

const sendMessageHandler = async (req, res) => {
  try {
    const sender = req.user.id;
    const conversation = req.params.conversationId;
    const { message } = req.body;
    const findConversation = await Conversation.findById(conversation);
    if (!findConversation) {
      return res.status(200).json({
        message: "No such conversation found",
      });
    }
     const newMessage = await Message.create({
  sender,
  conversation,
  message,
  readBy:[sender]
});
console.log(newMessage)
    findConversation.lastMessage = newMessage._id;
    findConversation.lastMessageAt = newMessage.createdAt;
    await findConversation.save();
    const receiverId = findConversation.users.find(
  (user) => user.toString() !== sender
);
    io.to(conversation).emit("new-message", newMessage);
    io.to(receiverId.toString()).emit("conversation-updated");
    const allMessages=await Message.find({conversation:conversation})
   return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default sendMessageHandler;
