import { useEffect, useState } from "react";
import { getUserApi } from "../../api/userApi";
import { createConversationApi } from "../../api/appApi";
import { useNavigate, Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import "./FriendSuggestion.css"; // Add this import

const FriendSuggestion = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()),
  );
  
  const loadUsers = async () => {
    const { res, data } = await getUserApi();
    if (res.ok) {
      setUsers(data);
    } else {
      console.log(data.message);
    }
  };
  
  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateConversation = async (recieverId) => {
    const { res, data } = await createConversationApi(recieverId);
    if (res.ok) {
      navigate(`/inbox/${data._id}`);
    }
  };

  return (
    <div className="suggestion-page-wrapper">
      
      {/* Clean back navigation */}
      <div className="suggestion-header">
        <Link to="/home" className="back-link">← Back to Home</Link>
      </div>

      <Search search={search} setSearch={setSearch} />

      <div className="suggestion-list-container">
        {users.length === 0 ? (
          <div className="empty-state"><p>No more people to show</p></div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state"><p>No matching user found</p></div>
        ) : (
          filteredUsers.map((user) => {
            // Generate the first letter for the avatar
            const initial = user.username ? user.username.charAt(0).toUpperCase() : "?";

            return (
              <div key={user._id} className="suggestion-card">
                
                {/* Left Side: Avatar and Name */}
                <div className="suggestion-info">
                  <div className="suggestion-avatar">{initial}</div>
                  <span className="suggestion-name">{user.username}</span>
                </div>

                {/* Right Side: Action Button */}
                <button
                  className="start-chat-btn"
                  type="button"
                  onClick={() => handleCreateConversation(user._id)}
                >
                  Message
                </button>
                
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FriendSuggestion;