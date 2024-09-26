import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

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

const Confirm = styled.div<{ right?: string }>`
  width: 350px;
  // height: 200px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #191919;
  z-index: 500;
  position: fixed;
  top: 144px;
  ${(props) => (props.right ? `right: ${props.right};` : "left: 30px;")}
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  height: 75px;
  color: ${color.white};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border-bottom: 1px solid rgba(104, 104, 104, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CancelBtn = styled.button`
  all: unset;
  color: #e43446;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  width: 100%;
  height: 64.97px;
  border-bottom: 1px solid rgba(104, 104, 104, 0.1);
  cursor: pointer;
`;
const SaveBtn = styled.button`
  all: unset;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  height: 64.97px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(104, 104, 104, 0.1);
`;
const Button = styled.button`
  all: unset;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  height: 64.97px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function RoundConfirm({
  title,
  firstText,
  secondText,
  text,
  onFirstFunc,
  onSecondFunc,
  onThirdFunc,
  right,
}: {
  title: React.ReactNode;
  firstText: React.ReactNode;
  secondText: React.ReactNode;
  text?: React.ReactNode;
  onFirstFunc: () => void;
  onSecondFunc: () => void;
  onThirdFunc?: () => void;
  right?: string;
}) {
  return (
    <Layout>
      <Confirm right={right}>
        <Title>{title}</Title>
        <CancelBtn onClick={onFirstFunc}>{firstText}</CancelBtn>
        <SaveBtn onClick={onSecondFunc}>{secondText}</SaveBtn>
        {text && <Button onClick={onThirdFunc}>{text}</Button>}
      </Confirm>
    </Layout>
  );
}

export default RoundConfirm;
