
const connectionSocket =  (socket,io) => {
    console.log('user connected',socket.id)
    socket.on("join-user", (userId) => {
    socket.join(userId);
});

    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id)
    })
    
};
export default connectionSocket