"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { AlarmButton } from "@/shared/ui/button";
import WriteButtonSVG from "@/shared/assets/img/write_icon.svg";
import HomeImg from "@/shared/assets/img/mainroom.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ActiveAlarmList } from "@/features/activeAlarmModal";
import { ActiveSideBar } from "@/features/activesidebar";

const StyledWriteButton = styled(WriteButtonSVG)`
  position: absolute;
  left: 92.5%;
  top: 85.89%;
  z-index: 10;
  cursor: pointer;
`;

const Container = styled.main<{ ismodalopen: boolean }>`
  width: ${({ ismodalopen }) =>
    ismodalopen ? "calc(100vw - 390px)" : "100vw"};
  font-family: Arial, sans-serif;
  position: fixed;
  top: 32px;
  left: 0px;
  transition: width 0.3s ease;
  overflow-x: hidden;
`;

const HomeDiv = styled.div`
  width: 100%;
  height: 98vh;
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
      <ActiveSideBar isModalOpen={isModalOpen}/>
      {isModalOpen && (
        <ActiveAlarmList
          isModalOpen={isModalOpen}
          handleAlarmButtonClick={handleAlarmButtonClick}
        />
      )}
      <Container ismodalopen={isModalOpen}>
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
    </>
  );
};
