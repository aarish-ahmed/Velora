import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { verifyEmailApi } from "../../api/userApi";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email || "";
  const purpose=location.state?.purpose || '';
  
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const userData = {
      email: email,
      verificationCode: e.target.verificationCode.value,
      purpose
    };
    
    try {
      const { data } = await verifyEmailApi(userData);
      setMessage(data.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <div className="verify-logo">
          <span className="logo-web">web</span>
          <span className="logo-chat">Chat</span>
        </div>
        <h2>Verify Email</h2>
        
        <form onSubmit={handleVerifyEmail} className="verify-form">
          <div className="input-box">
            <input type="email" readOnly value={email} name="email" className="verify-input readonly-input" />
            <input type="text" placeholder="enter verification code" name="verificationCode" required className="verify-input" />
          </div>
          <button type="submit" className="btn verify-btn" disabled={isLoading}>
             {isLoading ? <div className="spinner"></div> : "Verify"}
          </button>
        </form>
        
        <div className="verify-links">
          <Link to="/">Back to Login</Link>
        </div>
        {message && <p className="verify-message">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;