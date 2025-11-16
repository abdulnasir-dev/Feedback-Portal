import axios from "axios";

// Backend URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
