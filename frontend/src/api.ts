import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5200/api", // Your .NET backend
});

export default api;
