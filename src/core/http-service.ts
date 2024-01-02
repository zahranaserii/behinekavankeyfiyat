import axios from "axios";
const baseURL = "http://rezayari.ir:5050/";
export const httpServise = axios.create({
  baseURL: baseURL,
});

httpServise.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
