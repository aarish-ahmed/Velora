import Message from "../../models/messageModel.js";
import io from "../../server.js";

const updateReadStatusHandler = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: req.user.id },
        readBy: { $ne: req.user.id },
      },
      {
        $push: {
          readBy: req.user.id,
        },
      }
    );

    io.to(req.user.id).emit("conversation-updated");

    return res.status(200).json({
      message: "Messages marked as read",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default updateReadStatusHandler;