import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { useStore } from "@/shared/store";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 360px;
  height: 119px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px dashed #282828;
  background: #121212;
  position: absolute;
  top: 40vh;
  left:30px;
  // padding-left: 30px;
  // padding-right: 30px;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const P = styled.p`
color: ${color.pointcolor};
text-align: center;
-webkit-text-stroke-width: 1;
-webkit-text-stroke-color: #282828;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 150%
margin: 0;
`;

const Strong = styled.strong`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin: 0; 
`;

function NoneAlarm() {
  const user = useStore((state)=>state.user);
  return (
    <Layout>
      <Row>
        <P>{user?.nickname} 아무개님의</P>
        <Strong>새 글</Strong>
        <P>이</P>
      </Row>
      <Row>
        <Strong>숨바꼭질</Strong>
        <P>을 시작했어요!</P>
      </Row>
    </Layout>
  );
}

export default NoneAlarm;
