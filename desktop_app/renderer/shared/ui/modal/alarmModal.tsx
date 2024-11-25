import React, { ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";
import X from "@/shared/assets/img/x.svg";
import color from "@/shared/styles/color";

const slideIn = keyframes`
  from {
    right: -390px; /* 모달의 초기 위치 (화면 밖) */
  }
  to {
    right: 0;
  }
`;
const Header =styled.header`
 height:50px;
`

const slideOut = keyframes`
  from {
    right: 0;
  }
  to {
    right: -390px; /* 모달의 초기 위치 (화면 밖) */
  }
`;

const Layout = styled.div<{ isOpen: boolean }>`
  z-index: 500;
  width: 410px;
  // height: 95vh;
  background: #121212;
  position: absolute;
  top: 30px;
  right: 0;
  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${slideIn} 0.3s ease
        `
      : css`
          ${slideOut} 0.3s ease
        `};
  transition: width 0.3s ease;
  padding: 10px;
  height: auto;
  min-height: 95vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-left:1px solid #1a1a1a;
`;

const CloseButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 3vh;
  right: 20px;
  cursor: pointer;
  z-index:90;
`;

const H1 = styled.h1`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  position: absolute;
  top: 3vh;
  left: 30px;
  margin: 0;
`;

interface AlarmModalProps {
  isOpen: boolean;
  children?: ReactNode;
  handleAlarmButtonClick: () => void;
}

export const AlarmModal = ({
  isOpen,
  children,
  handleAlarmButtonClick,
}: AlarmModalProps) => {
  return (
    <Layout isOpen={isOpen}>
      <Header>
      <H1>알림</H1>
      <CloseButton onClick={handleAlarmButtonClick}>
        <X />
      </CloseButton>
      </Header>

      {children}
    </Layout>
  );
};

export default AlarmModal;
