import { useState } from "react"
import { getConversationApi } from "../../api/appApi"
import ConversationCard from "../../components/ConversationCard/ConversationCard"
import { useEffect } from "react"
import Search from "../../components/Search/Search"
import { useAuth } from "../../context/authContext"
import { socket } from "../../Socket/Socket"

const Conversations = () => {
   const { user } = useAuth();
   
    const loggedInUser = user.username;
  const [conversations,setConversations]=useState([])
  const [search, setSearch] = useState("");
  const filteredConversations = conversations.filter((conversation) => {
  const otherUser = conversation.users.find(
    (user) => user.username !== loggedInUser
  );

  return otherUser.username
    .toLowerCase()
    .includes(search.toLowerCase());
});
  
  const loadConversation = async() => {
    const {res,data}=await getConversationApi()
    if(res.ok){
      setConversations(data)
    }
    else{
      console.log(data.message)
    }
  }
  useEffect(() => {
  loadConversation();

  const handleConversationUpdate = () => {
    loadConversation();
  };

  socket.on("conversation-updated", handleConversationUpdate);

  return () => {
    socket.off("conversation-updated", handleConversationUpdate);
  };
}, []);
  return (
    <>
    
    <Search search={search} setSearch={setSearch} />
    <ConversationCard filteredConversations={filteredConversations}/>
    
    </>
  )
}

export default Conversations