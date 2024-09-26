import styled from "styled-components";
import Path from "@/shared/assets/img/path.svg";
import color from "@/shared/styles/color";
import { CircleButton } from "@/shared/ui/button";
import GoogleImage from "@/shared/assets/img/google.webp";
import KakaoImage from "@/shared/assets/img/kakao.webp";
import NaverImage from "@/shared/assets/img/naver.webp";
import AppleImage from "@/shared/assets/img/apple.webp";

const LoginText = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 86px;
`;
const P = styled.p`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  white-space: nowrap;
`;
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 31px;
`;

interface SocialLoginFieldProps {
  submitSocialLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function SocialLoginField({ submitSocialLogin }: SocialLoginFieldProps) {
  return (
    <>
      <LoginText>
        <Path />
        <P>간편 회원가입/로그인</P>
        <Path />
      </LoginText>
      <ButtonDiv>
        <CircleButton
          icon={GoogleImage}
          imgwidth={19}
          imgheight={19}
          bgColor="#FFF"
          name="google"
          onClick={submitSocialLogin}
        />
        <CircleButton
          icon={KakaoImage}
          imgwidth={25.471}
          imgheight={23.302}
          bgColor="#F1D700"
          name="kakao"
          onClick={submitSocialLogin}
        />
        <CircleButton
          icon={NaverImage}
          imgwidth={19}
          imgheight={19}
          bgColor="#5BBE38"
          name="naver"
          onClick={submitSocialLogin}
        />
        <CircleButton
          icon={AppleImage}
          imgwidth={28.838}
          imgheight={25.126}
          bgColor="#FFF"
          name="apple"
          onClick={submitSocialLogin}
        />
      </ButtonDiv>
    </>
  );
}

export default SocialLoginField;
