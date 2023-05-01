import axios from "axios";
import env from "../env";

const backendApi = axios.create({
  baseURL: env.API_URL,
});

backendApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});

export default backendApi