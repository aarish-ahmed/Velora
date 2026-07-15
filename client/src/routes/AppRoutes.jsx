import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import SendOtp from "../pages/SendOtp/SendOtp";
import EnterOtp from "../pages/EnterOtp/EnterOtp";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Inbox from "../pages/Inbox/Inbox";
import FriendSuggestion from "../pages/FriendSuggestion/FriendSuggestion";
import Navbar from "../components/Navbar/Navbar";

const routes = [
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <Navbar/>
        <Home />
      </>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <>
       
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/send-otp",
    element: (
      <>
       
        <SendOtp />
      </>
    ),
  },
  {
    path: "/enter-otp",
    element: (
      <>
      
        <EnterOtp />
      </>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <>
       
        <ResetPassword />
      </>
    ),
  },
  {
    path: "/inbox/:conversationId",
    element: (
      <>
       
        <Inbox/>
      </>
    ),
  },
  {
    path: "/friend/suggestion",
    element: (
      <>
        <FriendSuggestion/>
      </>
    ),
  },
];

export default routes;
