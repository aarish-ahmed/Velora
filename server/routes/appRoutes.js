import express from 'express'
import createConversationHandler from '../handlers/appHandlers/createConversation.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import getConversationHandler from '../handlers/appHandlers/getConversation.js'
import sendMessageHandler from '../handlers/appHandlers/sendMessage.js'
import getMessagesHandler from '../handlers/appHandlers/getMessages.js'
import updateReadStatusHandler from '../handlers/appHandlers/updateReadStatus.js'

const appRoutes=express.Router()

appRoutes.get('/create-conversation/:receiverId',authMiddleware,createConversationHandler)
appRoutes.get('/get-conversations',authMiddleware,getConversationHandler)
appRoutes.post('/send-message/:conversationId',authMiddleware,sendMessageHandler)
appRoutes.get('/get-message/:conversationId',authMiddleware,getMessagesHandler)
appRoutes.patch("/read/:conversationId",authMiddleware,updateReadStatusHandler);

export default appRoutes