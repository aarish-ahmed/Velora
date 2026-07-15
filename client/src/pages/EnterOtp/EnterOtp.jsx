import { useLocation, Link, useNavigate } from "react-router-dom";
import { verifyEmailApi } from "../../api/userApi";
import { useState } from "react";
import "./EnterOtp.css";

const EnterOtp = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email || "";
  const purpose = location.state?.purpose || "";

  const handleEnterOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const userData = {
      email: email,
      verificationCode: e.target.verificationCode.value,
      purpose
    };
    
    try {
      const { res, data } = await verifyEmailApi(userData);
      if (purpose === "verify") {
        setMessage(data.message);
      } else {
        if (res.ok) {
          navigate("/reset-password", {
            state: { email: email },
          });
        }
        setMessage(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="enter-otp-wrapper">
      <div className="enter-otp-card">
        <div className="enter-otp-logo">
          <span className="logo-web">web</span>
          <span className="logo-chat">Chat</span>
        </div>
        <h2>Enter OTP</h2>
        
        <form onSubmit={handleEnterOtpSubmit} className="enter-otp-form">
          <div className="input-box">
            <input type="email" readOnly name="email" value={email} className="enter-otp-input readonly-input" />
            <input type="text" name="verificationCode" placeholder="enter verification code" required className="enter-otp-input" />
          </div>
          <button type="submit" className="btn enter-otp-btn" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : "Verify"}
          </button>
        </form>

        <div className="enter-otp-links">
          <Link to="/">Back to Login</Link>
        </div>
        {message && <p className="enter-otp-message">{message}</p>}
      </div>
    </div>
  );
};

export default EnterOtp;