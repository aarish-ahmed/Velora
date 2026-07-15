export const signupApi = async (userData) => {
  const res = await fetch("http://localhost:5000/user/signup", {
    method: "POST",
    headers:{
        'content-type':'application/json'
    },
    body: JSON.stringify(userData),
  });
  const data=await res.json()
  return {res,data}
};

export const loginApi = async (userData) => {
  const res = await fetch("http://localhost:5000/user/login", {
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
  const res=await fetch("http://localhost:5000/user/verify-otp",{
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
  const res=await fetch("http://localhost:5000/user/send-otp",{
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
  const res=await fetch("http://localhost:5000/user/reset-password",{
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
  const res=await fetch("http://localhost:5000/user/logout",{
    method:'GET',
      credentials: "include",
    
  })
 const data=await res.json()

 return {res,data}
};

export const getCurrentUserApi = async () => {
 const res=await fetch("http://localhost:5000/user/me",{
    method:'GET',
      credentials: "include",
    
  })
 const data=await res.json()
 console.log(data)

 return {res,data}
};

export const getUserApi = async () => {
  const res=await fetch("http://localhost:5000/user/all",{
    method:'GET',
    credentials: "include",
    
  })
 const data=await res.json()
 console.log(data)

 return {res,data}
};