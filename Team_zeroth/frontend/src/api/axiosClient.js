import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://10.199.155.221:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
