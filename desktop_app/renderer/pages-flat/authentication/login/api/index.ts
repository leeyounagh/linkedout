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
const calculateExpiryDate = (days: number): Date => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
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
      const accessTokenExpiry = calculateExpiryDate(7); 
      const refreshTokenExpiry = calculateExpiryDate(30);

      if (autoLoginCheck) {
        Cookies.set("accessToken", accessToken, {
          expires: accessTokenExpiry,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refreshToken", refreshToken, {
          expires: refreshTokenExpiry,
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
