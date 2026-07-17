// Read the live URL from your .env file, falling back to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Note: If your project uses Create React App instead of Vite, swap the line above with:
// const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getConversationApi = async () => {
  const res = await fetch(`${BASE_URL}/app/get-conversations`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  return { res, data };
};

export const getMessageApi = async (conversationId) => {
  const res = await fetch(`${BASE_URL}/app/get-message/${conversationId}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  return { res, data };
};

export const sendMessageApi = async (conversationId, content) => {
  const res = await fetch(`${BASE_URL}/app/send-message/${conversationId}`, {
    method: "POST",
    headers: {
        'content-type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(content),
  });
  const data = await res.json();
  return { res, data };
}; 

export const createConversationApi = async (receiverId) => {
  const res = await fetch(`${BASE_URL}/app/create-conversation/${receiverId}`, {
    method: "GET",
    credentials: 'include',
  });
  const data = await res.json();
  return { res, data };
};

export const updateReadStatusApi = async (conversationId) => {
  const res = await fetch(
    `${BASE_URL}/app/read/${conversationId}`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await res.json();

  return { res, data };
};