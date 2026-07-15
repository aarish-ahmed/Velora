
import { useAuth } from "../../context/authContext"
import Conversations from "../Conversations/Conversations"



const Home = () => {
  const {user}=useAuth()
  if(!user){
    return <p>loading...</p>
  }
  return (
    <div>
      
      <Conversations/>
    </div>
  )
}

export default Home