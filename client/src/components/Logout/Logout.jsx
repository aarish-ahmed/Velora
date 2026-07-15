import { useNavigate } from "react-router-dom"
import { logoutApi } from "../../api/userApi"
import { useAuth } from "../../context/authContext";

const Logout = () => {
  const {setUser}=useAuth()
    const navigate=useNavigate()
  const handleLogoutSubmit = async(e) => {
    e.preventDefault()
    const {res,data}=await logoutApi()
    if(res.ok){
        navigate('/')
        setUser(null)

    }
    else{
        console.log(data.message)
    }
  }
  return (
    <>
    <form onSubmit={handleLogoutSubmit}>
        <button type='submit'>
            Logout
        </button>
    </form>
    </>
  )
}

export default Logout