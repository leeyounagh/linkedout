import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  height: 85vh; 
  display: flex;
  flex-direction: column;
`;

const Layout = styled.main`
  display: flex;
  width: 900px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
`;

function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <OuterContainer>
      <Layout>{children}</Layout>
    </OuterContainer>
  );
}

export default ContentLayout;