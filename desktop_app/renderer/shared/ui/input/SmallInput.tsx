import React from "react";
import styled, { css } from "styled-components";
import color from "@/shared/styles/color";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  maxLength?: number;
  hasError?: boolean; // 추가된 props
}

const Input = styled.input<{ hasValue: boolean; hasError: boolean }>`
  width: 52px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #252525;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "transparent")};
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 170%;
  ${({ hasValue, hasError }) =>
    hasValue &&
    !hasError &&
    css`
      border: 1px solid ${color.pointcolor};
    `}

  &:focus {
    border: 1px solid ${({ hasError }) => (hasError ? "red" : color.pointcolor)};
    outline: none;
  }
  /* 숫자 입력 필드의 화살표 숨기기 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox에서 숫자 입력 필드의 화살표 숨기기 */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

function SmallInput({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  maxLength = 1,
  hasError = false,
  disabled = false,
}: InputProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      maxLength={maxLength}
      hasValue={!!value}
      hasError={hasError}
      disabled={disabled}
    />
  );
}

export default SmallInput;
