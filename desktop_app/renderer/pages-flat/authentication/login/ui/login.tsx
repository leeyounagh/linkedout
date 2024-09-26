import React, { useEffect, useState, SetStateAction } from "react";
import { PrevButton } from "@/shared/ui/button";
import DefaultLayout from "../../ui/layout/defaultLayout";
import TextField from "../../ui/contents/textfield";
import InputField from "../../ui/contents/inputfield";
import Check from "@/shared/ui/check/check";
import styled from "styled-components";
import color from "@/shared/styles/color";
import ButtonFieldLayout from "../../ui/layout/buttonFieldLayout";
import { Button } from "@/shared/ui/button";
import SocialLoginField from "./content/SocialLoginField";
import Link from "next/link";
import { checkFirstLogin, localLogin, socialLogin } from "../api";
import { GeneralToast } from "@/shared/ui/toast";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useStore } from "@/shared/store";
import { getUserInfo } from "@/shared/api";
import { fetchData } from "@/shared/api/fetchData";

type SocialLoginName = "google" | "kakao" | "naver";

const CheckboxContainer = styled.fieldset`
  display: flex;
  align-items: center;
  position: absolute;
  top: 385px;
`;

const P = styled.p<{ $loginCheck: boolean }>`
  color: ${({ $loginCheck }) => ($loginCheck ? color.pointcolor : "#484848")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
const Nav = styled.nav`
  width: 100%;
  padding-top: 24px;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: center;
  gap: 26px;
`;
const Li = styled.li`
  list-style-type: none;
  color: #919191;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  text-decoration-line: underline;
  cursor: pointer;
`;

export const Login = () => {
  const searchParams = useSearchParams();
  const token =
    (searchParams.get("accessToken") && searchParams.get("refreshToken")) ||
    (Cookies.get("accessToken") && Cookies.get("refreshToken")) ||
    (sessionStorage.getItem("accessToken") &&
      sessionStorage.getItem("refreshToken"));

  const [infoData, setInfoData] = useState({
    id: { value: "", placeholder: "이메일 주소 또는 아이디" },
    password: { value: "", placeholder: "비밀번호" },
  });
  const [autoLoginCheck, setAutoLoginCheck] = useState(false);
  const [isShowToast, setIsShowToast] = useState(false);
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const [deviceId, setDeviceId] = useState("");
  const [fcmToken, setFcmToken] = useState("");

  const redirectToPage = (isFirstLogin: boolean) => {
    if (isFirstLogin) {
      router.push("/web/termsofuse");
    } else {
      router.push("/web/main");
    }
  };
  const calculateExpiryDate = (days: number): Date => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    return expiryDate;
  };

  const handleUserInfo = async () => {
    if (deviceId && fcmToken) {
      const userData = await getUserInfo();
      const body = {
        uid: deviceId,
        fcmToken: fcmToken,
      };

      if (userData) {
        setUser(userData);
        if (userData.isFirst) {
          await fetchData("support/devices/register", "post", body);
          redirectToPage(true);
          return;
        }
        if (deviceId.length > 0) {
          const deviceExists = userData.devices?.some(
            (device) => device?.uid === deviceId
          );
          if (!deviceExists) {
            try {
              await fetchData("support/devices/register", "post", body);
              redirectToPage(false);
            } catch (err) {
              console.log("err", err);
            }
          }
        }
        redirectToPage(false);
      }
    }
  };

  useEffect(() => {
    const handleDeviceInfo = (data: string) => {
      setDeviceId(data);
    };

    window.Electron?.requestDeviceInfo();
    window.Electron?.onDeviceInfo(handleDeviceInfo);
    window.Electron?.getFCMToken("getFCMToken", (_: any, token: string) => {
      setFcmToken(token);
    });
  }, []);

  useEffect(() => {
    const handleLogin = async () => {
      const socialAccessToken = searchParams.get("accessToken");
      const socialRefreshToken = searchParams.get("refreshToken");

      if (token) {
        if (socialAccessToken && socialRefreshToken) {
          try {
            // 소셜로그인 쿼리로 토큰이 세팅 되어있을때
            const accessTokenExpiry = calculateExpiryDate(7);
            const refreshTokenExpiry = calculateExpiryDate(30);

            Cookies.set("accessToken", socialAccessToken, {
              expires: accessTokenExpiry,
              secure: true,
              sameSite: "Strict",
            });
            Cookies.set("refreshToken", socialRefreshToken, {
              expires: refreshTokenExpiry,
              secure: true,
              sameSite: "Strict",
            });
            await handleUserInfo();
            // 소셜로그인의 경우 자동로그인 되게
          } catch (error) {
            console.error("Error handling tokens:", error);
          }
        } else {
          await handleUserInfo();
          // 로컬 로그인의 경우이면서 이미 자동로그인 체크한 상태
        }
      }
    };

    handleLogin();
  }, [token, autoLoginCheck, deviceId, fcmToken]);

  const isValidButton =
    infoData.id.value.length > 0 && infoData.password.value.length > 0;

  const submitLogin = async () => {
    setIsShowToast(false);
    const body = {
      email: infoData.id.value,
      password: infoData.password.value,
    };
    try {
      const statusCode = await localLogin(body, autoLoginCheck);
      if (statusCode === 200 || statusCode === 201) {
        //메인페이지 로컬회원가입의 경우 회원가입후 디바이스가 등록됨
        redirectToPage(false);
      }
    } catch (err) {
      console.log("err", err);
      if (err) {
        setIsShowToast(true);
      }
    }
  };

  const submitSocialLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget as HTMLButtonElement;
    const linkmapper = {
      google: process.env.NEXT_PUBLIC_API_URL + "auth/google",
      kakao: process.env.NEXT_PUBLIC_API_URL + "auth/kakao",
      naver: process.env.NEXT_PUBLIC_API_URL + "auth/naver",
      apple: process.env.NEXT_PUBLIC_API_URL + "auth/apple",
    };

    socialLogin(linkmapper[name as SocialLoginName]);
  };

  return (
    <>
      <PrevButton />
      <DefaultLayout>
        {isShowToast && (
          <GeneralToast
            title="로그인에 실패 했습니다."
            desc="아이디와 비밀번호를 확인해주세요."
            isShowToast={isShowToast}
            setIsShowToast={setIsShowToast}
          />
        )}

        <TextField
          title="안녕하세요!"
          title2="링크드아웃에 오신 것을 환영합니다."
        />
        <InputField data={infoData} setData={setInfoData} />
        <CheckboxContainer>
          <Check
            check={autoLoginCheck}
            setCheck={setAutoLoginCheck}
            type="general"
          />
          <P $loginCheck={autoLoginCheck}>자동로그인</P>
        </CheckboxContainer>
        <ButtonFieldLayout>
          <Button
            text="로그인"
            style="square"
            scale="large"
            type={isValidButton ? "point" : "disable"}
            onClick={isValidButton ? submitLogin : undefined}
          />
          <Nav>
            <Ul>
              <Li>아이디 찾기</Li>
              <Li>비밀번호 재설정</Li>
              <Link href="/web/signup">
                <Li>회원가입</Li>
              </Link>
            </Ul>
          </Nav>
          <SocialLoginField submitSocialLogin={submitSocialLogin} />
        </ButtonFieldLayout>
      </DefaultLayout>
    </>
  );
};
