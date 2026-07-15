import dotenv from 'dotenv'
dotenv.config()
import {createServer} from 'http'
import connectDB from './config/db.js'
import app from './app.js' 
import { Server } from 'socket.io'
import socketHandler from './socket/index.js'

connectDB()
const port =process.env.PORT
const server=createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

socketHandler(io)

server.listen(port,()=>{
    console.log(`server running on ${port}`)
})


export default io