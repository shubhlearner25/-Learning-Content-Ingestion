import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000, // 30 sec timeout
  maxBodyLength: Infinity,
  maxContentLength: Infinity
});

export default api;
