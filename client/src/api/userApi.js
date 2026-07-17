
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


export const signupApi = async (userData) => {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: "POST",
    headers:{
        'content-type':'application/json'
    },
    body: JSON.stringify(userData),
  });
  const data=await res.json()
  return {res,data}
};

// ... keep the rest of your exported API functions exactly the same!

export const loginApi = async (userData) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers:{
        'content-type':'application/json'
    },
    credentials:'include',
    body: JSON.stringify(userData),
  });
  const data=await res.json()
  return {res,data}
};

export const verifyEmailApi = async (userData) => {
  const res=await fetch(`${BASE_URL}/user/verify-otp`,{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    credentials:'include',
    body: JSON.stringify(userData),
  })
  const data=await res.json()
  return {res,data}
};

export const sendOtpApi = async (userData) => {
  const res=await fetch(`${BASE_URL}/user/send-otp`,{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    credentials:'include',
    body: JSON.stringify(userData),
  })

 console.log(res)
 return {res}
};

export const resetPasswordApi = async (userData) => {
  const res=await fetch(`${BASE_URL}/user/reset-password`,{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    credentials:'include',
    body: JSON.stringify(userData),
  })
 const data=await res.json()

 return {data}
};

export const logoutApi = async () => {
  const res=await fetch(`${BASE_URL}/user/logout`,{
    method:'GET',
      credentials: "include",
    
  })
 const data=await res.json()

 return {res,data}
};

export const getCurrentUserApi = async () => {
 const res=await fetch(`${BASE_URL}/user/me`,{
    method:'GET',
      credentials: "include",
    
  })
 const data=await res.json()
 console.log(data)

 return {res,data}
};

export const getUserApi = async () => {
  const res=await fetch(`${BASE_URL}/user/all`,{
    method:'GET',
    credentials: "include",
    
  })
 const data=await res.json()
 console.log(data)

 return {res,data}
};