import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "https://app-post-it-back-end.onrender.com",
});

export default api;
