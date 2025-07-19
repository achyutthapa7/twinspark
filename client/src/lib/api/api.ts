import { env } from "@/utils/env";
import { Helper } from "@/utils/helper";
import axios from "axios";

export const api = axios.create({
  baseURL: env.BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = Helper.getLocalStorage("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response?.data || { message: "An error occurred" }
    );
  }
);
