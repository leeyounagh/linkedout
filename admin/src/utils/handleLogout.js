import Cookies from "js-cookie";

export function handleLogout() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("email");
  window.location.href = "/authentication/sign-in";
}
