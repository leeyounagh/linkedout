import React, { useEffect } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

const Layout = styled.dialog<{ type: string }>`
  display: flex;
  width: 360px;
  height: 53px;
  justify-content: center;
  align-items: center;
  gap: 71px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ type }) =>
    type === "alert" ? color.red : color.pointcolor};
  color: ${color.white};
  border: none;
  z-index: 800;
`;

function ColorToast({
  text,
  type = "normal",
  duration = 3000,
  onClose,
  isShowToast = false,
}: {
  text: string;
  type?: string;
  duration?: number;
  onClose: () => void;
  isShowToast: boolean;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);
  if (!isShowToast) return null;
  return <Layout type={type}>{text}</Layout>;
}

export default ColorToast;
