"use client";
import React from "react";
import styled from "styled-components";
import { AlarmButton } from "@/shared/ui/button";
import WriteButtonSVG from "@/shared/assets/img/write_icon.svg";
import HomeImg from "@/shared/assets/img/mainroom.webp";
import Image from "next/image";
import ActiveFooter from "@/features/activeFooter/ui/activeFooter";
import { useRouter } from "next/navigation";

// WriteButton 스타일 확장
const StyledWriteButton = styled(WriteButtonSVG)`
  position: absolute;
  left: 92.5%;
  top: 88.89%;
  z-index: 10;
  cursor: pointer;
`;

const Container = styled.main`
  width: 82.8vw;
  font-family: Arial, sans-serif;
  position: fixed;
  top: 32px;
`;

const HomeDiv = styled.div`
  width: 100%;
  height: 88.6vh;
  position: relative;
`;

export const Main = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/web/write_essay");
  };
  return (
    <>
      <Container>
        <HomeDiv>
          <StyledWriteButton onClick={handleClick} />
          <AlarmButton />
          <Image alt="home" src={HomeImg} fill />
        </HomeDiv>
      </Container>
      <ActiveFooter />
    </>
  );
};
