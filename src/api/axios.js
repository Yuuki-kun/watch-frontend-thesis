import axios from "axios";

// const BASE_URL = "http://192.168.1.30:8080";
const BASE_URL = "https://watch-be-production.up.railway.app";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
