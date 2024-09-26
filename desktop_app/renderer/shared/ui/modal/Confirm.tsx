import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { Button } from "../button";

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ConfirmDialog = styled.div`
  width: 672px;
  height: 260px;
  flex-shrink: 0;
  border-radius: 20px 20px 0px 0px;
  background: #121212;
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  padding-left: 27px;
  padding-right: 27px;
`;
const TopRactangle = styled.div`
  width: 40px;
  height: 5px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #8a8a8a;
`;
const RactangleDiv = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 32px;
`;
const P = styled.p`
  color: ${color.white};
  width: 365px;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 18px;
  margin-top: 33px;
`;
interface ConfirmProps {
  title1?: string;
  title2?: string;
  onCancel?: () => void;
  onDelete?: () => void;
}

function Confirm({ title1, title2, onCancel, onDelete }: ConfirmProps) {
  return (
    <Layout>
      <ConfirmDialog>
        <RactangleDiv>
          <TopRactangle />
        </RactangleDiv>
        <TitleDiv>
          <P>{title1}</P>
          <P>{title2}</P>
        </TitleDiv>
        <ButtonDiv>
          <Button
            text="취소"
            style="square"
            type="disable"
            scale="large"
            onClick={onCancel}
          />
          <Button
            text="전체 삭제"
            style="square"
            type="red"
            scale="large"
            onClick={onDelete}
          />
        </ButtonDiv>
      </ConfirmDialog>
    </Layout>
  );
}

export default Confirm;
