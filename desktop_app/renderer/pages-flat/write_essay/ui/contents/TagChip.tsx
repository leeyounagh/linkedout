import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import BigTag from "@/shared/assets/img/bigTag_icon.svg";
import BigLocation from "@/shared/assets/img/big_location_icon.svg";

const Layout = styled.div`
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${color.pointcolor};
  display: flex;
  position: relative;
`;
const ImageDiv = styled.div`
  width: 69.552px;
  height: 100%;
  margin-right: 29.45px;
`;
const Button = styled.button`
  all: unset;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 15px;
`;
const TagDiv = styled.div`
  height: 100%;
  display: flex;
  gap: 20px;
`;
const Span = styled.span`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
`;
const P = styled.p`
  color: #a8aee4;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
`;
const TagContainer = styled.div`
  display: flex;
  gap: 20px;
`;
interface CompleteStatus {
  tag: boolean;
  location: boolean;
}

type HandleComplete = (tag: keyof CompleteStatus) => void;

function TagChip({
  activeTag,
  tagValues,
  locationValues,
  handleComplete,
}: {
  activeTag: "tag" | "location";
  tagValues: string[];
  locationValues: string[];
  handleComplete: HandleComplete;
}) {
  const imgMapper: Record<string, React.ReactNode> = {
    tag: <BigTag />,
    location: <BigLocation />,
  };

  const items =
    activeTag === "tag"
      ? tagValues
      : activeTag === "location"
      ? locationValues
      : [];

  const reorderedItems =
    activeTag === "location" && items.length > 0
      ? [...items.slice(1), items[0]]
      : items;

  return (
    <Layout>
      <ImageDiv>{imgMapper[activeTag]}</ImageDiv>
      <TagContainer>
        {reorderedItems.map((value, index) => (
          <TagDiv key={index}>
            {activeTag === "location" && index === reorderedItems.length - 1 ? (
              <P>{value}</P>
            ) : (
              <Span>{value}</Span>
            )}
          </TagDiv>
        ))}
      </TagContainer>

      <Button
        onClick={() => {
          handleComplete(activeTag);
        }}
      >
        편집
      </Button>
    </Layout>
  );
}

export default TagChip;
