import { sendOtpApi } from "../../api/userApi";
import { useNavigate, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./SendOtp.css";

const SendOtp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const purpose = searchParams.get('purpose');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const userData = {
      email: e.target.email.value,
    };
    
    try {
      const { res } = await sendOtpApi(userData);
      if (res.ok) {
        navigate("/enter-otp", {
          state: {
            email: userData.email,
            purpose
          },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="send-otp-wrapper">
      <div className="send-otp-card">
        <div className="send-otp-logo">
          <span className="logo-web">web</span>
          <span className="logo-chat">Chat</span>
        </div>
        <h2>Verify</h2>
        
        <form onSubmit={handleSendOtpSubmit} className="send-otp-form">
          <div className="input-box">
            <input type="email" placeholder="enter your email" name="email" required className="send-otp-input" />
          </div>
          <button type="submit" className="btn send-otp-btn" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : "Send Code"}
          </button>
        </form>

        <div className="send-otp-links">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;