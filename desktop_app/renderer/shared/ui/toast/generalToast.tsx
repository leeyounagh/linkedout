import styled from "styled-components";
import color from "@/shared/styles/color";
import Closebutton from "../button/closebutton";
import { Dispatch, SetStateAction } from "react";

const Overlay = styled.div`
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
`;

const Layout = styled.div<{ positionTop?: string }>`
  display: flex;
  width: 440px;
  height: 81px;
  padding: 16px 0px 16px 0px;
  flex-shrink: 0;
  white-space: nowrap;
  text-align: left;
  border-radius: 10px;
  background: #212121;
  position: fixed;
  top: ${({ positionTop }) => positionTop || '82.21vh'};
  z-index: 1000;
`;

const P = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  color: ${color.pointcolor};
`;

const H1 = styled.h1`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20px;
  top: 30px;
  gap: 7px;
`;

const CloseButtonDiv = styled.div`
  position: absolute;
  top: 45px;
  right: 18px;
`;

interface GeneralToastProps {
  title: string;
  desc?: string;
  isShowToast: boolean;
  setIsShowToast: Dispatch<SetStateAction<boolean>>;
  positionTop?:string,
}

const GeneralToast: React.FC<GeneralToastProps> = ({
  title,
  desc,
  isShowToast,
  setIsShowToast,
  positionTop=""
}) => {
  if (!isShowToast) {
    return null;
  }
  return (
    <Overlay>
      <Layout positionTop={positionTop}>
        <CloseButtonDiv>
          <Closebutton isShowModal={isShowToast} setIsShowModal={setIsShowToast} />
        </CloseButtonDiv>
        <ContentDiv>
          <H1>{title}</H1>
          <P>{desc}</P>
        </ContentDiv>
      </Layout>
    </Overlay>
  );
};

export default GeneralToast;
