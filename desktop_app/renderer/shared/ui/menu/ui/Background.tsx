import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 59.24vw;
  height: 100%;
  position: fixed;
  left: 636px;
  top: 32px;
  background: rgba(0, 0, 0, 0.8);
  z-index:500;
`;

function Background() {
  return <Layout></Layout>;
}

export default Background;
