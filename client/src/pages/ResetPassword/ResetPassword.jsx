import { useLocation, Link } from "react-router-dom";
import { resetPasswordApi } from "../../api/userApi";
import { useState } from "react";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email || "";

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const userData = {
      email: email,
      password: e.target.password.value,
    };
    
    try {
      const { data } = await resetPasswordApi(userData);
      setMessage(data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <div className="reset-logo">
          <span className="logo-web">web</span>
          <span className="logo-chat">Chat</span>
        </div>
        <h2>Reset Password</h2>
        
        <form onSubmit={handleResetPasswordSubmit} className="reset-form">
          <div className="input-box">
            <input type="email" readOnly name="email" value={email} className="reset-input readonly-input" />
            <input type="password" placeholder="enter new password" name="password" required className="reset-input" />
          </div>
          <button type="submit" className="btn reset-btn" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : "Change Password"}
          </button>
        </form>

        <div className="reset-links">
          <Link to="/">Back to Login</Link>
        </div>
        {message && <p className="reset-message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;