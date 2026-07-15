export const getConversationApi = async () => {
  const res = await fetch("http://localhost:5000/app/get-conversations", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  return { res, data };
};

export const getMessageApi = async (conversationId) => {
  const res = await fetch(`http://localhost:5000/app/get-message/${conversationId}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  return { res, data };
};

export const sendMessageApi = async (conversationId,content) => {
  const res=await fetch(`http://localhost:5000/app/send-message/${conversationId}`,{
    method: "POST",
    headers:{
        'content-type':'application/json'
    },
    credentials:'include',
    body: JSON.stringify(content),
  });
  const data=await res.json()
  return {res,data}
}; 

export const createConversationApi = async (receiverId) => {
  const res=await fetch(`http://localhost:5000/app/create-conversation/${receiverId}`,{
    method: "GET",
    credentials:'include',
   
  });
  const data=await res.json()
  return {res,data}
};

export const updateReadStatusApi = async (conversationId) => {
  const res = await fetch(
    `http://localhost:5000/app/read/${conversationId}`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await res.json();

  return { res, data };
};