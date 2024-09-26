import React, { ReactNode } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

const Layout = styled.div<{ isFocused: boolean }>`
  width: 320px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid  ${({ isFocused }) => (isFocused ? color.pointcolor : "#191919")};
  background:#121212;
  z-index: 10;
  display:flex;
  justify-content: center;
  align-items: center;
  padding-left:24px;
  padding-right:24px;
  padding-bottom:auto;
  cursor: pointer;
  height:auto;
  min-height: 159px;
`;

function GeneralCard({
  children,
  isFocused,
  onClick
}: {
  children: ReactNode;
  isFocused: boolean;
  onClick?: () => void;
}) {
  return <Layout isFocused={isFocused} onClick={onClick}>{children}</Layout>;
}

export default GeneralCard;