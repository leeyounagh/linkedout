import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import color from "@/shared/styles/color";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = styled.div`
  display: flex;
  width: 360px;
  height: 60px;
  padding: 16px 0px 16px 0px;
  flex-shrink: 0;
  white-space: nowrap;
  text-align: left;
  border-radius: 10px;
  background: #212121;
  position: fixed;
  top: 82.21vh;
  z-index: 1000;
`;
const Title = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color:${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

interface GeneralToastProps {
  title: string;
  isShowToast: boolean;
  setIsShowToast: Dispatch<SetStateAction<boolean>>;
}

const MiniToast: React.FC<GeneralToastProps> = ({
  title,
  isShowToast,
  setIsShowToast,
}) => {
  if (!isShowToast) {
    return null;
  }
  return (
    <Overlay>
      <Layout>
        <Title>{title}</Title>
      </Layout>
    </Overlay>
  );
};

export default MiniToast;
