import { Link } from "react-router-dom";
import "./Navbar.css";
import Logout from "../Logout/Logout";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="nav-container">
      
      {/* NEW: Premium Text Logo on the left */}
      <div className="nav-logo">
        <Link to={user ? "/home" : "/"}>
          <span className="logo-web">web</span>
          <span className="logo-chat">Chat</span>
        </Link>
      </div>

      {/* Existing links wrapped in a div to group them on the right */}
      <div className="nav-links">
        {!user && (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/">Login</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/home">Home</Link>
            <Link to="/friend/suggestion">Add people</Link>
            <Logout />
          </>
        )}
      </div>
      
    </div>
  );
};

export default Navbar;