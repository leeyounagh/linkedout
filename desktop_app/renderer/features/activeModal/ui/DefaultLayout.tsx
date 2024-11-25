import React from "react";
import styled from "styled-components";
import PrevButtonImg from "@/shared/assets/img/prevbutton.svg";
const Layout = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 500;
  background: #121212;
  position: fixed;
  top: 32px;
  left: 265px;
  padding: 10px;
`;
const PrevBtn = styled.button`
  all: unset;
  cursor: pointer;
`;

function DefaultLayout({
  children,
  modlaHandler,
  name
}: {
  children: React.ReactNode;
  modlaHandler: (name: string) => void;
  name:string
}) {
  return (
    <Layout>
      <PrevBtn onClick={()=>modlaHandler(name)}>
        <PrevButtonImg />
      </PrevBtn>
      {children}
    </Layout>
  );
}

export default DefaultLayout;
