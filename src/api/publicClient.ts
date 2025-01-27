import axios from "axios";

const baseURL = `${process.env.EXPO_PUBLIC_API_URL}/api`;

const publicClient = axios.create({
  baseURL,
});

export default publicClient;
