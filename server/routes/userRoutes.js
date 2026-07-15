import express from 'express'
import signupHandler from '../handlers/userHandlers/signupHandler.js'
import loginHandler from '../handlers/userHandlers/loginHandler.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import verifyOtpHandler from '../handlers/userHandlers/verifyOtp.js'
import { callSendOtpHandler } from '../handlers/userHandlers/sendOtpHandler.js'
import resetPasswordHandler from '../handlers/userHandlers/resetPasswordHandler.js'
import logoutHandler from '../handlers/userHandlers/logout.js'
import getCurrentUser from '../handlers/userHandlers/currentUser.js'
import getUsers from '../handlers/userHandlers/getUsers.js'


const userRoutes=express.Router()

userRoutes.post('/signup',signupHandler)
userRoutes.post ('/login',loginHandler)
userRoutes.post('/verify-otp',verifyOtpHandler)
userRoutes.post('/send-otp',callSendOtpHandler)
userRoutes.post('/reset-password',resetPasswordHandler)
userRoutes.get('/logout',authMiddleware,logoutHandler)
userRoutes.get('/me',authMiddleware,getCurrentUser)
userRoutes.get('/all',authMiddleware,getUsers)


export default userRoutes
