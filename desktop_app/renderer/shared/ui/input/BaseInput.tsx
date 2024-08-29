import React, { ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

// 크기별 스타일을 설정하는 mapper 객체
const sizeMapper = {
  small: "width: 60px;",
  middle: "width: 180px;",
  large: "width: 40px; ",
};

interface InputProps {
  size?: "small" | "middle" | "large";
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = styled.input<{
  size: "small" | "middle" | "large";
  value?: string;
}>`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  box-shadow: none;
  width: 100%;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  color: ${({ value }) =>
    Number(value?.length) > 0 ? color.white : "#686868"};
  ::placeholder {
    color: #686868;
  }
  ${({ size }) => sizeMapper[size]}
`;

const BaseInput: React.FC<InputProps> = ({
  size = "middle",
  placeholder,
  value,
  onChange,
  onKeyPress,
  ...props
}) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyPress}
      {...props}
    />
  );
};

export default BaseInput;
