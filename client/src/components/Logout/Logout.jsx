import { useNavigate } from "react-router-dom"
import { logoutApi } from "../../api/userApi"
import { useAuth } from "../../context/authContext";
import { socket } from "../../Socket/Socket";

const Logout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogoutSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await logoutApi();
    } catch (error) {
      console.log("Logout request error, clearing local session anyway:", error);
    } finally {
      if (socket) {
        socket.disconnect();
      }
      
      setUser(null);
      navigate('/');
    }
  };

  return (
    <>
      <form onSubmit={handleLogoutSubmit}>
        <button type='submit'>
          Logout
        </button>
      </form>
    </>
  );
};

export default Logout;