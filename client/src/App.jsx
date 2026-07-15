import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import routes from './routes/appRoutes'
import { useEffect } from 'react'
import { useAuth } from './context/authContext'
import { socket } from "./Socket/Socket"
function App() {
  const {user}=useAuth()
  const router=createBrowserRouter(routes)
  useEffect(() => {
  if (user) {
    socket.emit("join-user", user._id);
  }
}, [user]);
  return (
    <>
  <RouterProvider router={router}/>
    </>
  )
}

export default App
