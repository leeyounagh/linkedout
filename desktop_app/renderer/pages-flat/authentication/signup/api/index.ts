import axios from "axios";
import Cookies from 'js-cookie';
interface bodyType {
  email: string;
  password: string;
}

export const submitSignupForm = async (body: bodyType) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "auth/sign",
      body
    );
    const statusCode = response.data.statusCode;
    return statusCode;
  } catch (error) {
    console.error("Error response:", error);
    throw error;
  }
};


export const registerUser = async (code: string) => {
  try {
    const body = {
      code: code,
    };
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "auth/register",
      body
    );
    console.log("test", response.data.data,response.data.statusCode)
    const { accessToken, refreshToken } = response.data.data;
    Cookies.set('accessToken', accessToken, { expires: 7 });
    Cookies.set('refreshToken', refreshToken, { expires: 30 }); 
    const statusCode = response.data.statusCode;
    return statusCode;
  } catch (err) {
    console.error("Error response:", err);
    throw err;
  }
};
