
const conversationSocket =  (socket,io) => {
    socket.on('join-room',(conversationId)=>{
        socket.join(conversationId)  
        console.log(`socket ${socket.id} joined conversation ${conversationId}`)
    }
)};
export default conversationSocket