"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { AlarmButton } from "@/shared/ui/button";
import WriteButtonSVG from "@/shared/assets/img/write_icon.svg";
import HomeImg from "@/shared/assets/img/mainroom.webp";
import Image from "next/image";
import ActiveFooter from "@/features/activeFooter/ui/activeFooter";
import { useRouter } from "next/navigation";
import { AlarmModal } from "@/shared/ui/modal";
import ActiveAlarmModal from "@/features/activeAlarmModal/ui"


const StyledWriteButton = styled(WriteButtonSVG)`
  position: absolute;
  left: 92.5%;
  top: 85.89%;
  z-index: 10;
  cursor: pointer;
`;

const Container = styled.main<{ isModalOpen: boolean }>`
  width: ${({ isModalOpen }) =>
    isModalOpen ? "calc(100vw - 390px)" : "100vw"};
  font-family: Arial, sans-serif;
  position: fixed;
  top: 32px;
  left: 0;
  transition: width 0.3s ease;
  overflow-x: hidden;
`;

const HomeDiv = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
`;
export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/web/write_essay");
  };

  const handleAlarmButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      {isModalOpen && <ActiveAlarmModal isModalOpen={isModalOpen} handleAlarmButtonClick={handleAlarmButtonClick}/>}
      <Container isModalOpen={isModalOpen}>
        <HomeDiv>
          {!isModalOpen && (
            <>
              <StyledWriteButton onClick={handleClick} />
              <AlarmButton onClick={handleAlarmButtonClick} />
            </>
          )}

          <Image alt="home" src={HomeImg} fill />
        </HomeDiv>
      </Container>
      <ActiveFooter isModalOpen={isModalOpen} />
    </>
  );
};
