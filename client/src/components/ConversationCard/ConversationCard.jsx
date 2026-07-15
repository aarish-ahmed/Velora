import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./ConversationCard.css";

const ConversationCard = ({ filteredConversations }) => {
  const { user } = useAuth();

  const loggedInUser = user.username;

  return (
    <>
      {filteredConversations.length > 0 ? (
        <>
          {filteredConversations.map((conversation) => {
           console.log( conversation.lastMessage)
            const otherUser = conversation.users.find(
              (user) => user.username !== loggedInUser,
            );

            const initial = otherUser?.username
              ? otherUser.username.charAt(0).toUpperCase()
              : "";
            const unRead =
              !conversation.lastMessage.readBy.includes(user._id) &&
              conversation.lastMessage.sender !== user._id;

            return (
              <>
                <div key={conversation._id} className="conversation-card">
                  <Link
                    to={`/inbox/${conversation._id}`}
                    className="conversation-link"
                  >
                    {/* NEW: The Avatar Circle */}
                    <div
                      className={`conversation-avatar ${
                        [
                          "avatar-navy",
                          "avatar-blue",
                          "avatar-purple",
                          "avatar-teal",
                          "avatar-green",
                          "avatar-red",
                          "avatar-orange",
                          "avatar-pink",
                        ][(otherUser?.username?.charCodeAt(0) || 0) % 8]
                      }`}
                    >
                      {initial}
                    </div>

                    {/* NEW: Wraps the text so it stays stacked next to the avatar */}
                    <div className="conversation-text-wrapper">
                      <h3 className="conversation-name">
                        {otherUser?.username
                          ?.split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase(),
                          )
                          .join(" ")}
                      </h3>
                      <p
                        className={`conversation-message ${unRead ? "unread" : ""}`}
                      >
                        {conversation.lastMessage.message}
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          <p>No Conversation Made Yet</p>
        </>
      )}
    </>
  );
};

export default ConversationCard;
