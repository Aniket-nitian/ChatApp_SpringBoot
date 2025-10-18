import axios from "axios";
export const baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
