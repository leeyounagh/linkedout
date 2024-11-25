import React, { useEffect, useState } from "react";
import ScrollTopIcon from "@/shared/assets/img/scrollTop.webp";
import Image from "next/image";
import styled from "styled-components";

const ScrollTopButton = styled.div<{ visible: boolean; bottom: string }>`
  position: fixed;
  bottom: ${({ bottom }) => bottom};
  right: 51px;
  display: ${({ visible }) => (visible ? "block" : "none")};
  cursor: pointer;
  z-index: 500;
`;

function ScrollTop({ bottom = "70px" }: { bottom?: string }) {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setVisible(scrollTop > 300);
    window.Electron.ipcRenderer.send("scroll-event", scrollTop);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);
  return (
    <ScrollTopButton visible={visible} onClick={scrollToTop} bottom={bottom}>
      <Image src={ScrollTopIcon} alt="Scroll to top" width={55} height={55} />
    </ScrollTopButton>
  );
}

export default ScrollTop;
