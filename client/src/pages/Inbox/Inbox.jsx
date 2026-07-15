 import { useState, useEffect } from "react"
import { getMessageApi, updateReadStatusApi } from "../../api/appApi"
import InboxFooter from "../../components/InboxFooter/InboxFooter"
import InboxHeader from "../../components/InboxHeader/InboxHeader"
import Messages from "../../components/Messages/Messages"
import { useParams } from "react-router-dom"
import "./Inbox.css"
import { socket } from "../../Socket/Socket"

const Inbox = () => {
  const [reciever, setReceiver] = useState()
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])
 
  useEffect(() => {
    const loadMessage = async() => {
    const {res, data} = await getMessageApi(conversationId)
    await updateReadStatusApi(conversationId);
    if(res.ok){
     setMessages(data.messages)
     setReceiver(data.receiver)
    }
    else{
      console.log(data.message)
    }
  }
  loadMessage()
  }, [])

  useEffect(()=>{
    
    socket.emit('join-room',conversationId)
  },[conversationId])

  useEffect(() => {
  socket.on("new-message", async (newMessage) => {
    console.log("Received:", newMessage);

    setMessages((prev) => [...prev, newMessage]);

    await updateReadStatusApi(conversationId);
  });

  return () => {
    socket.off("new-message");
  };
}, [conversationId]);

  
  return (
    <div className="inbox-container">
      <InboxHeader receiver={reciever} />
      
      <div className="messages-scroll-area">
        <Messages messages={messages} />
      </div>
      
      <InboxFooter/>
    </div>
  )
}

export default Inbox