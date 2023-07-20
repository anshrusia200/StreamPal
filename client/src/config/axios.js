import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://devcon-backend-c3zc.onrender.com"
    : "http://localhost:8000/";

console.log(axios.defaults.baseURL);
