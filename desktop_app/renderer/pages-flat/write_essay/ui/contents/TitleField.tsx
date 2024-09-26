import React, { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import BaseInput from "@/shared/ui/input/BaseInput";
import { PrevButton } from "@/shared/ui/button";

interface ButtonProps {
  isCancel: boolean;
  isDelete: boolean;
}

const Layout = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: flex-end;
  padding-right: 18px;
  padding-bottom: 10px;
`;
const Button = styled.button<ButtonProps>`
  all: unset;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  padding: 10px 20px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1;
  ${({ isCancel, isDelete }) =>
    isCancel
      ? css`
          color: #686868;
        `
      : isDelete
      ? css`
          color: #c13535;
        `
      : css`
          color: #fff;
        `}
`;

const TitleDiv = styled.div`
  width: 89.98%;
  input {
    width: 100%;
  }
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 10px 20px;
  position: relative;
`;
interface TitleFieldProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  handlenavigateBack: () => void;
  step: string;
  handleStep: () => void;
}

function TitleField({
  title,
  setTitle,
  handlenavigateBack,
  step,
  handleStep,
}: TitleFieldProps) {
  return (
    <Layout>
      {step === "write" ? (
        <Button isCancel={true} isDelete={false} onClick={handlenavigateBack}>
          취소
        </Button>
      ) : (
        <PrevButton onClick={handleStep}/>
      )}

      <TitleDiv>
        {step === "write" && (
          <BaseInput
            value={title}
            placeholder="제목을 입력해 주세요"
            onChange={(e) => setTitle(e.target.value)}
            isTextCenter ={true}
          />
        )}
      </TitleDiv>
      <Button
        isCancel={false}
        isDelete={step === "finish"}
        onClick={handleStep}
      >
        {step === "write" ? "완료" : "삭제"}
      </Button>
    </Layout>
  );
}

export default TitleField;
