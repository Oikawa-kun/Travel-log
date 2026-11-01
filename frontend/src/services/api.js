import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-log-backend-e8kp.onrender.com/api",
  withCredentials: true,
});

export default api;
