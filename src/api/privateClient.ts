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

  createAuthRefreshInterceptor(api, refreshAuth, {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log("API interceptors: ", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log("Error Response: ", error.response);
        return Promise.reject({ code: "SERVER_ERROR" });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log("Error Request:", error.request);
        return Promise.reject({ code: "NETWORK_ERROR" });
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error", error.message);
        return Promise.reject({ code: "UNKNOWN_ERROR" });
      }
    },
  );

  return api;
};

export default privateClient;
