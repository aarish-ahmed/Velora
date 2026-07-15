import { signupApi } from '../../api/userApi'
import './Signup.css'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'

const Signup = () => {
  const navigate=useNavigate()
  const [message,setMessage]=useState()
  const [loading, setLoading]=useState(false) // 1. Added loading state

  const handleSignup = async(e) => {
    e.preventDefault()
    setLoading(true) // 2. Start loading
    const userData={
      email:e.target.email.value,
      username:e.target.username.value,
      password:e.target.password.value
    }
    const purpose='verify'
    try {
      const {res,data}= await signupApi(userData)
      if(res.ok){
        navigate('/verify-email',{
          state:{
            email:data.email,
            purpose:purpose
          }
        })
      }
      else{
        setMessage(data.message)
      }
    } finally {
      setLoading(false) // 3. Stop loading when done
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        
        <div className="signup-logo">
          <span className="logo-web">web</span>
          <span className="logo-chat">Chat</span>
        </div>

        <h2>Signup</h2>
        
        <form onSubmit={handleSignup} className="signup-form">
          <div className="input-box">
            <input
              type="email"
              name='email'
              required
              placeholder="enter your email"
              className="signup-input"
            />
            <input
              type="text"
              name='username'
              required
              placeholder="enter your username"
              className="signup-input"
            />
            <input
              type="password" 
              name='password'
              required
              placeholder="enter password"
              className="signup-input"
            />
          </div>
          {/* 4. Disabled state and conditional spinner added below */}
          <button type="submit" className='btn signup-btn' disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Signup'}
          </button>
        </form>
        
        <div className="signup-links">
          <p>Already have an account?</p>
          <div className="link-group">
            <Link to='/'>Login</Link>
            <span className="divider">|</span>
            <Link to='/send-otp?purpose=verify'>Verify</Link>
          </div>
        </div>
        
        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  )
}

export default Signup