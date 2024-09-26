import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

const Button = styled.button`
  background: none;
  border: none;
  width: auto;
  white-space: nowrap;
  height: 35px;
  padding: 5px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  background: #1D1D1D;
  border-radius: 10px;
  cursor: pointer;
`;

function BaseButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return <Button onClick={onClick}>{children}</Button>;
}

export default BaseButton;
