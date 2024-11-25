import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import HomeFocusIcon from "@/shared/assets/img/homeicon_focus.svg";
import EssayFocusIcon from "@/shared/assets/img/home_essay_icon_focus.svg";
import CommunityFocusIcon from "@/shared/assets/img/home_community_icon_focus.svg";
import MypageFocusIcon from "@/shared/assets/img/home_mypage_focus.svg";
import HomeDisableIcon from "@/shared/assets/img/homeicon_disabled.svg";
import EssayDisableIcon from "@/shared/assets/img/home_essay_icon_disabled.svg";
import CommunityDisableIcon from "@/shared/assets/img/home_community_icon_disabled.svg";
import MypageDisableIcon from "@/shared/assets/img/home_mypage_disabled.svg";

const Container = styled.footer<{ isModalOpen: boolean }>`
  display: flex;
  width: ${({ isModalOpen }) =>
    isModalOpen ? "calc(100vw - 390px)" : "100vw"};
  height: 77px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: fixed;
  bottom: 0;
  left: 0px;
  background-color: ${color.black};
  transition: width 0.3s ease;
`;

const Wrapper = styled.div`
  width: 59.12%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

interface IconMap {
  home: React.ReactElement;
  myessay: React.ReactElement;
  community: React.ReactElement;
  mypage: React.ReactElement;
}

const disableIcon: IconMap = {
  home: <HomeDisableIcon />,
  myessay: <EssayDisableIcon />,
  community: <CommunityDisableIcon />,
  mypage: <MypageDisableIcon />,
};

const focusIcon: IconMap = {
  home: <HomeFocusIcon />,
  myessay: <EssayFocusIcon />,
  community: <CommunityFocusIcon />,
  mypage: <MypageFocusIcon />,
};

interface FooterProps {
  focusedKey: keyof IconMap;
  onIconClick: (key: keyof IconMap) => void;
  isModalOpen?: boolean;
}

export const Footer = ({
  focusedKey,
  onIconClick,
  isModalOpen=false,
}: FooterProps) => {
  const icons = ["home", "myessay", "community", "mypage"].map((key) => {
    const isFocused = focusedKey === key;
    const IconComponent = isFocused
      ? focusIcon[key as keyof IconMap]
      : disableIcon[key as keyof IconMap];

    return (
      <div key={key} onClick={() => onIconClick(key as keyof IconMap)}>
        {IconComponent}
      </div>
    );
  });

  return (
    <Container isModalOpen={isModalOpen}>
      <Wrapper>{icons}</Wrapper>
    </Container>
  );
};
