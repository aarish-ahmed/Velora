import { useParams } from "react-router-dom";
import { sendMessageApi } from "../../api/appApi";
import "./InboxFooter.css"; 

const InboxFooter = () => {
   const {conversationId}=useParams()
  const handleSendMessage = async(e) => {
    e.preventDefault()
    const content={
      message:e.target.message.value
    }
   const {res,data}=await sendMessageApi(conversationId,content)
   if(res.ok){
    console.log(data)
    
    e.target.reset() 
   }
    
  }
  return (
    <div className="inbox-footer-container">
      <form onSubmit={handleSendMessage} className="inbox-footer-form">
        <input 
          type="text"
          placeholder="send a message"
          name="message"
          required
          className="inbox-input"
        />
        <button type="submit" className="inbox-send-btn">send</button>
      </form>
    </div>
  )
}

export default InboxFooter;