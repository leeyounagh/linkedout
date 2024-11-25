import React, { useState } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TabItem = styled.button<{
  isactivetab: boolean;
  isblack: boolean;
  width: string;
}>`
  all: unset;
  width: ${({ width }) => (width ? width : "219px")};
  height: 48px;
  color: ${({ isblack }) => (isblack ? "#252525" : color.white)};
  border-bottom: ${({ isactivetab, isblack }) =>
    isactivetab && isblack
      ? `3px solid #252525`
      : isactivetab && !isblack
      ? `3px solid ${color.white}`
      : "none"};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  data {
    margin-top: 3px;
    margin-left: 10px;
  }
`;

function Tab({
  tabData,
  activeTab,
  handleChangeActiveTab,
  listCount,
  isBlack = false,
  width = "219px",
}: {
  tabData: string[];
  activeTab: number;
  handleChangeActiveTab: (index: number) => void;
  listCount?: number;
  isBlack?: boolean;
  width?: string;
}) {
  return (
    <TabContainer>
      {tabData.map((item, index) => (
        <TabItem
          key={item}
          isactivetab={activeTab === index}
          isblack={isBlack}
          width={width}
          onClick={() => handleChangeActiveTab(index)}
        >
          {item}
          <data> {activeTab === index && listCount}</data>
        </TabItem>
      ))}
    </TabContainer>
  );
}

export default Tab;
