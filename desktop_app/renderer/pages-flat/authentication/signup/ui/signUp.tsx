import DefaultLayout from "../../ui/layout/defaultLayout";
import { PrevButton } from "@/shared/ui/button";
import TextField from "../../ui/contents/textfield";
import { useState, useEffect } from "react";
import InputField from "../../ui/contents/inputfield";
import { Button } from "@/shared/ui/button";
import styled from "styled-components";
import { submitSignupForm } from "../api";
import { GeneralToast } from "@/shared/ui/toast";
import { BottomSheet } from "@/shared/ui/modal";
import VerificationField from "./contents/VerificationField";

const ButtonLayout = styled.div`
  position: absolute;
  top: 684px;
`;

interface InputData {
  id: { value: string; placeholder: string };
  password: { value: string; placeholder: string };
}

const validateInput = (input: string, regex: RegExp): boolean => {
  return regex.test(input);
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

const isButtonEnabled = (inputData: InputData): boolean => {
  const isEmailValid = validateInput(inputData.id.value, emailRegex);

  const isPasswordValid = validateInput(
    inputData.password.value,
    passwordRegex
  );

  return isEmailValid && isPasswordValid;
};

function SignUP() {
  const [inputData, setInputData] = useState({
    id: { value: "", placeholder: "이메일 주소 또는 아이디" },
    password: { value: "", placeholder: "비밀번호" },
  });
  const isEmailValid = validateInput(inputData.id.value, emailRegex);
  const isPasswordValid = validateInput(
    inputData.password.value,
    passwordRegex
  );
  const [error, setError] = useState({
    id: false,
    password: false,
  });
  const [isButtonEnabledState, setIsButtonEnabled] = useState(false);
  const [toastText, setToastText] = useState({
    title: "입력하신 이메일 주소로 인증 메일이 발송됐습니다.",
    desc: "인증 번호를 입력해 설정을 완료해주세요.",
  });
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(isButtonEnabled(inputData));
  }, [inputData]);

  const handleError = () => {
    setError((prev) => ({
      ...prev,
      id: !isEmailValid,
      password: !isPasswordValid,
    }));
  };
  const onSubmit = async (type?: string) => {
    if (type !== "retry") {
      setIsVerificationOpen(false);
    } 
    handleError();

    if (!isButtonEnabledState) {
      return;
    }
    const email = inputData.id.value;
    const password = inputData.password.value;
    const body = {
      email: email,
      password: password,
    };
    try {
      const statusCode = await submitSignupForm(body);
      if (statusCode === 201 || statusCode === 204) {
        setToastText({
          title: "입력하신 이메일 주소로 인증 메일이 발송됐습니다.",
          desc: "인증 번호를 입력해 설정을 완료해주세요.",
        });
        setIsVerificationOpen(true);
        setHasError(false);
        setIsButtonEnabled(false);
      }
    } catch (err) {
      if (err) {
        setHasError(true);
        setToastText({
          title: "이메일 인증에 실패했습니다 :( ",
          desc: "다시 시도해주세요.",
        });
      }
    }
  };
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && isButtonEnabledState) {
          event.preventDefault(); 
          onSubmit();
        }
      };
    
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [isButtonEnabledState,inputData]);
    
  return (
    <DefaultLayout>
      <GeneralToast
        title={toastText.title}
        desc={toastText.desc}
        isShowToast={isVerificationOpen || hasError}
        setIsShowToast={hasError ? setHasError : setIsVerificationOpen}
        positionTop={hasError ? "" : "45.4vh"}
      />
      {isVerificationOpen && (
        <BottomSheet isOpen={isVerificationOpen}>
          <VerificationField onRetry ={onSubmit} />
        </BottomSheet>
      )}

      <PrevButton />
      <TextField
        title="이메일로 가입하기"
        desc="회원 서비스 이용을 위해 회원가입을 해주세요."
      />
      <InputField
        data={inputData}
        setData={setInputData}
        isValidateText={true}
        error={error}
      />
      <ButtonLayout>
        <Button
          text="회원가입"
          style="square"
          scale="large"
          type={isButtonEnabledState ? "point" : "disable"}
          onClick={() => onSubmit()}
        />
      </ButtonLayout>
    </DefaultLayout>
  );
}

export default SignUP;
