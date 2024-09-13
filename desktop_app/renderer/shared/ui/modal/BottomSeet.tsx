import React, { ReactNode } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

interface DialogProps {
  size?: string;
}

const Dialog = styled.div<DialogProps>`
  width: ${(props) => (props.size === "large" ? "700px" : "442px")};
  height: 359px;
  flex-shrink: 0;
  filter: drop-shadow(0.1px 0.1px 1px rgba(255, 255, 255, 0.1));
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  border: none;
  margin: 0;
  border-radius: 20px 20px 0px 0px;
  background: ${color.lightBlack};
  z-index: 1000;
`;

interface BottomSheetProps {
  children: ReactNode;
  isOpen: boolean;
  size?: string;
}

function BottomSeet({ children, isOpen, size }: BottomSheetProps) {
  if (!isOpen) {
    return null;
  }
  return <Dialog size={size}>{children}</Dialog>;
}

export default BottomSeet;
