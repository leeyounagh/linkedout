import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useStore } from "@/shared/store";
import color from "@/shared/styles/color";
import Search from "@/shared/assets/img/search.svg";

const Layout = styled.header`
  width: 90%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserName = styled.h1`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-left: 30px;
`;
const SearchIcon = styled.button<{ isexpanded: boolean }>`
  all: unset;
  cursor: pointer;
  position: absolute;
  left: ${({ isexpanded }) => (isexpanded ? "78%" : "90.78%")};
  transition: left 0.3s ease;
  top: 37.63px;
`;

const expand = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 140px;
    opacity: 1;
  }
`;

const collapse = keyframes`
  from {
    width: 140px;
    opacity: 1;
  }
  to {
    width: 0;
    opacity: 0;
  }
`;
const SearchInput = styled.input<{ isexpanded: boolean }>`
  all: unset;
  border-bottom: 1px solid ${color.white};
  font-size: 11px;
  padding: 5px;
  width: 140px;
  position: absolute;
  top: 37.63px;
  left: ${({ isexpanded }) => (isexpanded ? "81%" : "100%")};
  transition: left 0.3s ease;
  ${({ isexpanded }) =>
    isexpanded
      ? css`
          animation: ${expand} 0.3s forwards;
        `
      : css`
          animation: ${collapse} 0.3s forwards;
        `}
`;

function Header() {
  const user = useStore((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleButtonClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <Layout>
      <UserName>{user?.nickname} 님</UserName>
      <SearchIcon isexpanded={isExpanded} onClick={handleButtonClick}>
        <Search />
      </SearchIcon>
      <SearchInput
        isexpanded={isExpanded}
        placeholder="검색할 내용을 입력해주세요..."
      ></SearchInput>
    </Layout>
  );
}

export default Header;
