import React, { useState } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

const Layout = styled.div`
  background: #313131;
  width: 100%;
  height: 41px;
  position: absolute;
  top: 45px;
  padding-left:16px;
`;

const Ul = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 32px;
  padding-left: 32px;
`;
const Li = styled.li<{ isActive: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  padding: 5px 0;
  color: ${(props) => (props.isActive ? color.pointcolor : color.white)};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  transition: color 0.3s ease;

  &:hover {
    color: #616fed;
  }

  &:active {
    color: #616fed;
  }
`;
interface SelectTextProps {
  option: Array<"small" | "default" | "large" | "huge">;
  applyFontSize: (size: "small" | "default" | "large" | "huge") => void;
}

function SelectText({ option, applyFontSize }: SelectTextProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleItemClick = (size: "small" | "default" | "large" | "huge") => {
    applyFontSize(size);
    setActiveItem(size);
  };
  return (
    <Layout>
      <Ul>
        {option.map((size) => (
          <Li
            key={size}
            isActive={activeItem === size}
            onClick={() => handleItemClick(size)}
          >
            {size === "default" ? "Default" : size}
          </Li>
        ))}
      </Ul>
    </Layout>
  );
}

export default SelectText;
