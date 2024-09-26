import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { Button } from "@/shared/ui/button";
import { formatDateToFullKorean } from "@/shared/lib/date";

const TitleText = styled.h1`
  color: ${color.pointcolor};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  position: absolute;
  top: 180px;
  left: 75px;
  width: 300px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;
const P = styled.p`
  color: #c5c5c5;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const TitleDiv = styled.div`
  position: absolute;
  top: 260px;
  left: 130px;
`;

const ButtonDiv = styled.div`
  position: absolute;
  top: 360px;
  left: 80px;
`;

function LinkedoutTextField({
  title,
  createdDate,
  handleCloseModal
}: {
  title: string;
  createdDate: string;
  handleCloseModal?:()=>void;
}) {
  return (
    <>
      <TitleText>{title}</TitleText>
      <TitleDiv>
        <P>로 시작하는 글, 기억하시나요? </P>
        <br />
        <P>{formatDateToFullKorean(createdDate)}에 </P>
        <P>링크드아웃한 글이 발견됐어요.</P>
      </TitleDiv>
      <ButtonDiv>
        <Button text="확인" style="square" scale="small" type="point" onClick={handleCloseModal}/>
      </ButtonDiv>
    </>
  );
}

export default LinkedoutTextField;
