import React from "react";
import styled from "styled-components";

const Layout =styled.div`
  width:59.24vw;
  height:100%;
  position:fixed;
  left:636px;
  top:32px;
  background: #121212;
  z-index:600;
`

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

export default DefaultLayout;
