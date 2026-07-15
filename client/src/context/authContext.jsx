import { useEffect } from "react"
import { useState } from "react"
import { useContext,createContext } from "react"
import { getCurrentUserApi } from "../api/userApi"

const AuthContext=createContext()
const AuthProvider = ({children}) => {
     const [user,setUser]=useState(null)
     const [loading,setLoading]=useState(true)
     useEffect(() => {
    const loadUser = async () => {
      try {
        const { res, data } = await getCurrentUserApi();

        if (res.ok) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);
    
     
  return (
    <>
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            isAuthticated:!!user
        }}>
          {children}
        </AuthContext.Provider>
    </>
  )
}

export default AuthProvider

export const useAuth = () => {

    return useContext(AuthContext)

}
