import React, { useState, useEffect } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { SmallInput } from "@/shared/ui/input";
import { registerUser } from "../../api";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/shared/api";
import { useStore } from "@/shared/store";
import { fetchData } from "@/shared/api/fetchData";

const RectangleDiv = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Rectangle = styled.div`
  width: 40px;
  height: 5px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #8a8a8a;
`;
const H1 = styled.h1`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  padding-left: 31px;
  padding-top: 10px;
  margin-top:32px;
`;
const P = styled.p`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  padding-left: 31px;
  margin-top: 6px;
`;
const InputDiv = styled.div`
  width: 100%;
  padding-top: 41px;
  padding-left: 31px;
  display: flex;
  gap: 7px;
  margin-bottom: 7px;
`;
const H2 = styled.h2`
  color: #6b6b6b;
  font-family: Abel;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
const RetryDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 45px;
`;
const Button = styled.button`
  background: none;
  border: none;
  color: ${color.pointcolor};
  font-family: Abel;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  text-decoration-line: underline;
  cursor: pointer;
`;
const ErrorMsg = styled.output`
  color: #e43446;
  font-family: Abel;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  padding-left: 31px;
  margin-top: 7px;
`;
function VerificationField({ onRetry }: { onRetry: (type?: string) => void }) {
  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = e.target.value;
      setInputValues(newInputValues);
    };
  const handleUserInfo = async () => {
    const userData = await getUserInfo();
    if (userData) {
      setUser(userData);
      const body = {
        uid: deviceId,
        fcmToken: fcmToken,
      };
      try {
        await fetchData("support/devices/register", "post", body);
        router.push("/web/termsofuse");
      } catch (err) {
        console.log("err", err);
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
    const isComplete = inputValues.every((value) => value.length === 1);
    if (isComplete) {
      const timer = setTimeout(async () => {
        try {
          const statusCode = await registerUser(inputValues.join(""));
          if (statusCode === 201) {
            setHasError(false);
            setErrorMessage("");
            await handleUserInfo();
          } else {
            setHasError(true);
            setErrorMessage("인증번호를 잘못 입력하셨습니다.");
          }
        } catch (error) {
          setHasError(true);
          setErrorMessage(
            "서버와의 연결에 문제가 발생했습니다. 다시 시도해 주세요."
          );
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [inputValues]);
  const onRetryHandler = () => {
    setInputValues(Array(6).fill(""));
    onRetry("retry");
  };
  return (
    <>
      {/* <RectangleDiv>
        <Rectangle />
      </RectangleDiv> */}
      <H1>인증번호 입력하기</H1>
      <P>이메일로 인증번호 6자리를 보내드렸어요.</P>
      <InputDiv>
        {inputValues.map((value, index) => (
          <SmallInput
            key={index}
            value={value}
            onChange={handleChange(index)}
            hasError={hasError}
            disabled={index > 0 && !inputValues[index - 1]}
          />
        ))}
      </InputDiv>
      <ErrorMsg>{errorMessage}</ErrorMsg>
      <RetryDiv>
        <H2>인증번호를 못 받으셨나요?</H2>
        <Button onClick={() => onRetryHandler()}>인증번호 재전송</Button>
      </RetryDiv>
    </>
  );
}

export default VerificationField;
