import axios from "axios";

// Create axios instance with base URL from environment variable
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://life-link-services-2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
