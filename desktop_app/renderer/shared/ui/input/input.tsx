import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

const SInput = styled.input<{ hasError?: boolean }>`
  border-radius: 10px;
  background: #252525;
  width: 442px;
  height: 50px;
  flex-shrink: 0;
  box-sizing: border-box;
  border: ${(props) => (props.hasError ? "2px solid #E43446" : "none")};
  color: #fff;
  padding-left: 17px;
  &:focus {
    border: 1px solid ${color.pointcolor};
    outline: none;
  }
`;
interface InputProps<T> {
  placeholder: string;
  name: keyof T;
  setState: Dispatch<SetStateAction<T>>;
  error?: boolean;
}

export const Input = <
  T extends { [key: string]: { value: string; placeholder: string } }
>({
  placeholder,
  name,
  setState,
  error,
}: InputProps<T>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name as keyof T],
        value: value,
      },
    }));
  };
  const inputType = name === "password" ? "password" : "text";
  return (
    <SInput
      placeholder={placeholder}
      onChange={handleChange}
      name={name as string}
      type={inputType}
      hasError={error}
    />
  );
};
