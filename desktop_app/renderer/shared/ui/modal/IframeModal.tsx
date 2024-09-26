import React, { useEffect } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { Button } from "../button";

const Layout = styled.div`
  width: 450px;
  height: 664px;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${color.white};
  z-index: 100;
  position: absolute;
  top: 8.38vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const H1 = styled.h1`
  color: ${color.black};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 170%;
  position: absolute;
  top: 32px;
`;
const ButtonDiv = styled.div`
  position: absolute;
  top: 600px;
`;
const ContentDiv = styled.div`
  width: 445px;
  height: 500px;
  background: white;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
function Modal({
  title,
  url,
  isModalOpen,
  onClick
}: {
  title: string;
  url: string;
  isModalOpen: boolean;
  onClick:() =>void;
}) {
  if(!isModalOpen){
      return null
  }
  useEffect(() => {
    const iframe = document.getElementById("iframe") as HTMLIFrameElement;
    iframe.onload = () => {
      const iframeDocument = iframe.contentDocument;
      const iframeWindow = iframe.contentWindow;
      if (iframeDocument && iframeWindow) {
        // Viewport 설정
        const meta = iframeDocument.createElement("meta");
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0";
        iframeDocument.head.appendChild(meta);

        const style = iframeDocument.createElement("style");
        style.textContent = `
              /* 스크롤바 스타일 변경 */
              ::-webkit-scrollbar {
                width: 6px;
              }
              ::-webkit-scrollbar-track {
                background: #f1f1f1; 
              }
              ::-webkit-scrollbar-thumb {
                background: ${color.darkgray}; 
                border-radius: 10px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: #555; 
              }
            `;
        iframeDocument.head.appendChild(style);
      }
    };
  }, []);
  return (
    <Layout>
      <H1>{title}</H1>
      <ContentDiv>
        <Iframe id="iframe" src={url}></Iframe>
      </ContentDiv>
      <ButtonDiv>
        <Button text="확인" style="square" scale="large" type="point" onClick={onClick} />
      </ButtonDiv>
    </Layout>
  );
}

export default Modal;
