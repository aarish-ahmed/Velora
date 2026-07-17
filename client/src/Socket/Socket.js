import { io } from "socket.io-client";

// Reads your live Render backend URL from Netlify's environment variables, with a fallback to localhost for local testing
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const socket = io(BASE_URL, {
  withCredentials: true
});