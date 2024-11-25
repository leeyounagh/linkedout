import axios from "axios";
import Cookies from "js-cookie";
import { AxiosInstance } from "@/shared/api";

interface bodyType {
  email: string;
  password: string;
}

export const checkFirstLogin = async () => {
  const response = await AxiosInstance.get("users/check-first");
  const isFisrstLogin = response.data.data;
  return isFisrstLogin;
};
const calculateExpiryDate = (minutes: number): Date => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + minutes * 60 * 1000);
  return expiryDate;
};
export const localLogin = async (body: bodyType, autoLoginCheck: boolean) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "auth/login", body);
    const statusCode = response.data.statusCode;
    const data =response.data.data
    console.log("response",response.data.data)

    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken;

    if (accessToken && refreshToken) {
      const accessTokenExpiry = calculateExpiryDate(30); 
      if (autoLoginCheck) {
        Cookies.set("accessToken", accessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refreshToken", refreshToken, {
          expires: 30,
          secure: true,
          sameSite: "Strict",
        });
      } else {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
      }
    } else {
      console.error("Access token or refresh token is missing from headers");
    }

    return statusCode;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const socialLogin = async (link: string) => {
  return (window.location.href = link);
};
