import { useEffect, useRef } from "react";
import { useAuth } from "../../context/authContext";
import './Messages.css';

const Messages = ({ messages }) => {
  const { user } = useAuth();
  
  // 1. Create a reference to the bottom of the chat
  const messagesEndRef = useRef(null);

  // 2. Function to smoothly scroll to that reference
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 3. Run the scroll function every time the 'messages' array changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messages-container">
      {messages.map((message) => {
        const rawSenderId = message.sender?._id || message.sender;
        const senderId = String(rawSenderId);
        const myId = String(user?._id || user?.id);
        const isMyMessage = senderId === myId;

        return (
          <div 
            key={message._id} 
            className={`message-wrapper ${isMyMessage ? 'message-right' : 'message-left'}`}
          >
            <div className={`message-bubble ${isMyMessage ? 'bubble-right' : 'bubble-left'}`}>
              <p>{message.message}</p>
            </div>
            <span className="message-time">
              {formatTime(message.createdAt)}
            </span>
          </div>
        );
      })}
      
      {/* 4. The invisible anchor for the scroll function */}
      <div ref={messagesEndRef}></div>

    </div>
  );
};

export default Messages;