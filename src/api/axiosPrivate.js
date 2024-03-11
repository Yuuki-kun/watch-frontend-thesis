import axios from "axios";

// const BASE_URL = "http://192.168.1.30:8080";
// const BASE_URL = "https://watch-be-production.up.railway.app";
const BASE_URL = "http://localhost:8080";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
