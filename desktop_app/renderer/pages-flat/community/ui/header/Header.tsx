import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Search from "@/shared/assets/img/search_black.svg";
import BlackBookMark from "@/shared/assets/img/black_bookmark.svg";
import WhiteSearch from "@/shared/assets/img/search.svg";
import color from "@/shared/styles/color";
import PointedBookMark from "@/shared/assets/img/bookmark/pointedBookMark.svg";

const Layout = styled.header`
  width: 90%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1<{ isblack: boolean }>`
  color: ${({ isblack }) => (isblack ? color.white : "#252525")};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  // margin-left: 30px;
  margin-top: 34px;
`;
const SearchIcon = styled.button<{ isexpanded: boolean }>`
  all: unset;
  cursor: pointer;
  position: absolute;
  left: 89%;
  transition: left 0.3s ease;
  top: 37.63px;
`;

const BookMarkBtn = styled.button<{ isexpanded: boolean }>`
  all: unset;
  cursor: pointer;
  position: absolute;
  left: 93%;
  top: 40px;
`;
function Header({
  activeTab,
  modlaHandler,
}: {
  activeTab: number;
  modlaHandler: (name: string) => void;
}) {
  const isBlack = activeTab === 0 ? false : true;
  const [isExpanded, setIsExpanded] = useState(false);
  const handleButtonClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <Layout>
      <Title isblack={isBlack}>커뮤니티</Title>
      <SearchIcon
        isexpanded={isExpanded}
        onClick={() => modlaHandler("search")}
      >
        {isBlack ? <WhiteSearch /> : <Search />}
      </SearchIcon>
      <BookMarkBtn
        isexpanded={isExpanded}
        onClick={() => modlaHandler("bookmark")}
      >
        {isBlack ? <PointedBookMark /> : <BlackBookMark />}
      </BookMarkBtn>
    </Layout>
  );
}

export default Header;
