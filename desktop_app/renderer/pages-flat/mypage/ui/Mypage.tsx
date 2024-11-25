import React from "react";
import { ActiveSideBar } from "@/features/activesidebar";
import styled from "styled-components";

const Layout = styled.main`
  width: 100vw;
  min-height: 90vh;
  overflow-y: auto;
`;

export const Mypage = () => {
  return (
    <Layout>
      <ActiveSideBar></ActiveSideBar>
    </Layout>
  );
};
