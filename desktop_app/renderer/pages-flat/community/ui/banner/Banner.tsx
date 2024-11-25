import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tab } from "@/shared/ui/tab";
import { SelectBox } from "@/shared/ui/selectbox";
import colorList from "@/shared/styles/color";
import { getSentence } from "@/shared/api";
import { parseDataToChips } from "../../lib/parseDataToChips";
import { useRouter } from "next/navigation";

const Layout = styled.div`
  width: 862px;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 102px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-top:40px;
`;
const H1 = styled.h1`
  color: #262626;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 170%;
`;
const P = styled.p`
  color: #696969;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
const ContentDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 500px;
  overflow: hidden;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  position: relative;
`;
const TitleTextDiv = styled.div``;
const SelectBoxDiv = styled.div`
  margin-right: 30px;
`;
const Chip = styled.div<{
  color?: string;
  expanded?: boolean;
  width: string;
  index: number;
  isVisible: boolean;
  left: string;
  translateX: string;
}>`
  background-color: ${({ color = colorList.black }) => color};
  cursor: pointer;
  display: inline-flex;
  height: 60px;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  // gap: 10px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 170%;
  border-radius: 0px 50px 50px 0px;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  width: ${({ expanded, width, index }) =>
    expanded ? (index === 0 ? "822px" : "calc(820px - 40px)") : width};
  transition: width 0.5s ease, transform 0.5s ease;
  transform: ${({ expanded, index, translateX }) => {
    if (expanded) {
      return translateX;
    }
  }};
  z-index: ${({ expanded, index }) => (expanded ? 1 : 10 - index)};
  position: absolute;
  top: 0;
  left: ${({ left }) => left};
`;
const Span = styled.span<{ color?: string }>`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  position:absolute;
  left:20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ color = colorList.white }) => color};
`;
const ContentItemDiv = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;
const ChipContainer = styled.div`
  position: relative;
  width: 100%;
`;
const DetailBtn = styled.button`
  all: unset;
  cursor: pointer;
  color: ${colorList.black};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  border-radius: 40px;
  background: #d9d9d9;
  width: 100px;
  height: 45px;
  flex-shrink: 0;
  position:absolute;
  right:12px;
`;
const options = [
  { value: "first", label: "첫 문장" },
  { value: "last", label: "마지막 문장" },
];
function Banner() {
  const [selectedValue, setSelectedValue] = useState<string>(options[0].label);
  const [sentence, setSentence] = useState<any>([]);
  const [expandedChipIndices, setExpandedChipIndices] = useState<{
    [key: number]: number | null;
  }>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });
  const router = useRouter();
  useEffect(() => {
    fetchGetSentence();
  }, [selectedValue]);

  const fetchGetSentence = async () => {
    try {
      const selectedOption = options.filter(
        (option) => option.label === selectedValue
      );
      const { value } = selectedOption[0];

      const { data } = await getSentence(value);
      const parsedData = parseDataToChips(data);
      setSentence(parsedData);
    } catch (e) {
      console.error("fetchGetSentence error", e);
    }
  };
  const handleChipClick = (group: number, index: number) => {
    setExpandedChipIndices((prevIndices) => {
      const newIndices = { ...prevIndices };

      if (newIndices[group] === index) {
        newIndices[group] = null;
      } else {
        for (let key in newIndices) {
          newIndices[key] = parseInt(key) === group ? index : null;
        }
      }

      return newIndices;
    });
  };


  const navigateToDetails = (id: number, status: string) => {
    router.push(`/web/essay_details?id=${id}&pageType=${status}`);
  };

  return (
    <Layout>
      <TitleDiv>
        <TitleTextDiv>
          <H1>한 문장을 모아</H1>
          <P>글의 시작을 알리는 문장들을 만나보세요.</P>
        </TitleTextDiv>
        <SelectBoxDiv>
          <SelectBox
            options={options}
            selectedValue={selectedValue}
            onChange={(value) => setSelectedValue(value)}
          />
        </SelectBoxDiv>
      </TitleDiv>
      <ContentDiv>
        {sentence.map((group: any[], groupIndex: number) => (
          <ContentItemDiv key={`group-${groupIndex}`}>
            {group.map((chip, chipIndex) => (
              <ChipContainer key={`chip-${groupIndex}-${chipIndex}`}>
                <Chip
                  expanded={expandedChipIndices[groupIndex + 1] === chipIndex}
                  onClick={() => handleChipClick(groupIndex + 1, chipIndex)}
                  width={chip.width}
                  color={chip.color}
                  index={chipIndex}
                  isVisible={
                    expandedChipIndices[groupIndex + 1] === null ||
                    expandedChipIndices[groupIndex + 1] === chipIndex
                  }
                  left={chip.left}
                  translateX={chip.translateX}
                >
                  <Span color={chip.textColor}>{chip.text}</Span>
                  {expandedChipIndices[groupIndex + 1] === chipIndex && (
                    <DetailBtn
                      onClick={() => navigateToDetails(chip.id, chip.status)}
                    >
                      자세히 보기
                    </DetailBtn>
                  )}
                </Chip>
              </ChipContainer>
            ))}
          </ContentItemDiv>
        ))}
      </ContentDiv>
    </Layout>
  );
}

export default Banner;
