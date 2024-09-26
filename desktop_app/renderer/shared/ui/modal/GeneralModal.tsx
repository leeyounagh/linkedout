import React from "react";
import styled from "styled-components";
import Subtract from "@/shared/assets/img/subtract.svg";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  isBackgroundVisible?: boolean;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div<{ isBackgroundVisible: boolean }>`
  background-color: ${({ isBackgroundVisible }) =>
    isBackgroundVisible ? "none" : "#1d1d1d"};
  border-radius: 10px;
  padding: 20px;
  width: 340px;
  height: 325px;
  max-width: 90%;
  position: relative;
`;
const GeneralModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  isBackgroundVisible = false,
}) => {
  console.log("isBackgroundVisible", isBackgroundVisible);
  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        isBackgroundVisible={isBackgroundVisible}
      >
        {isBackgroundVisible && (
          <Subtract
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "380px",
              height: "365px",
              zIndex: -1,
            }}
          />
        )}
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GeneralModal;
