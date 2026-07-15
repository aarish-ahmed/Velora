import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Login.css'
import { loginApi } from '../../api/userApi'
import { useAuth } from "../../context/authContext";

const Login = () => {
  const {setUser}=useAuth()
  const navigate=useNavigate()
  const [message,setMessage]=useState()

  const handleLogin = async(e) => {
    e.preventDefault()
    const userData={
      email:e.target.email.value,
      password:e.target.password.value
    }
    const {res,data}= await loginApi(userData)
    if(res.ok){
      navigate('/home')
      setUser(data.user)
    }
    else{
      setMessage(data.message)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        <div className="login-logo">
          <span className="logo-web">web</span>
          <span className="logo-chat">Chat</span>
        </div>

        <h2>Login</h2>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-box">
            <input
              type="email"
              name='email'
              required
              placeholder="enter your email"
              className="login-input"
            />
            <input
              type="password"
              name='password'
              required
              placeholder="enter password"
              className="login-input"
            />
          </div>
          
          <div className="forgot-password">
            <Link to='/send-otp?purpose=reset'>Reset Password?</Link>
          </div>

          <button type="submit" className='btn login-btn'>Login</button>
        </form>
        
        <div className="login-links">
          <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
        </div>
        
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  )
}

export default Login