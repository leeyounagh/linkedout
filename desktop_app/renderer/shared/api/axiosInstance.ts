import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

AxiosInstance.interceptors.request.use((config) => {
  let accessToken = sessionStorage.getItem("accessToken");
  let refreshToken = sessionStorage.getItem("refreshToken");

  if (!accessToken && !refreshToken) {
    accessToken = Cookies.get("accessToken") || null;
    refreshToken = Cookies.get("refreshToken") || null;
  }
  if (refreshToken) {
    config.headers["x-refresh-token"] = refreshToken;
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["x-access-token"];
    if (newAccessToken) {
      if (sessionStorage.getItem("refreshToken")) {
        sessionStorage.setItem("accessToken", newAccessToken);
      } else {
        Cookies.set("accessToken", newAccessToken, {
          expires:1,
          secure: true,
          sameSite: "Strict",
        });
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken =
        Cookies.get("refreshToken") || sessionStorage.getItem("refreshToken");
      if (refreshToken) {
        // originalRequest.headers["x-refresh-token"] = refreshToken;
        const newResponse = await AxiosInstance(originalRequest);
        return newResponse;
      } else {
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/web/login";
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;