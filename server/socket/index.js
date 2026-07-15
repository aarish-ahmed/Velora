import connectionSocket from "./connectionSocket.js";
import conversationSocket from "./conversationSocket.js";


const socketHandler = (io) => {
    io.on('connection',(socket)=>{
        connectionSocket(socket,io)
        conversationSocket(socket,io)
       
    })
};
export default socketHandler