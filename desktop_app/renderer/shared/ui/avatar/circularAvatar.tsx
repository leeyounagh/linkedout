import React from "react";
import styled from "styled-components";
import Image, { StaticImageData } from "next/image";

const Layout = styled.div`
  width: 75px;
  height: 75px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background:#1A1A1A;
`;



function CircularAvatar({
  img,
  width,
  height
}: {
  img: StaticImageData | string;
  width: number;
  height: number;
}) {
  return (
    <Layout>
      <Image src={img} alt="Circular Avatar" width={width} height={height}/>
    </Layout>
  );
}

export default CircularAvatar;