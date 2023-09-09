import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://devcon-backend-c3zc.onrender.com"
    : `http://${window.location.hostname}:8000`;

console.log(axios.defaults.baseURL);
