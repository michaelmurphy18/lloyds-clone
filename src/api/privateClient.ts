import { useAuth } from "@/store";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuth } from "./refresh";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const privateClient = () => {
  const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeoutErrorMessage: "Request timed out",
    timeout: 10000, // 10 seconds

    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    async (config) => {
      const token = useAuth.getState().accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("API interceptors: ", error);

      return Promise.reject("API Error");
    },
  );

  createAuthRefreshInterceptor(api, refreshAuth, {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true,
  });

  return api;
};

export default privateClient;
