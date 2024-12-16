import React, { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import LinkedoutIcon from "@/shared/assets/img/linkedout.svg";
import { getStoryEssayList } from "@/shared/api";
import { useStore } from "@/shared/store";
import { formatDateString } from "@/shared/lib/date";
import { getEssays } from "@/features/showessaydetails/api";
import { getStories } from "@/shared/api";
import { useRouter } from "next/router";
import { NoneContents } from "@/shared/ui/layout";

const StoryInfo = styled.div`
  width: 640px;
  height: 200px;
  flex-shrink: 0;
  background: ${color.pointcolor};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 40px;
  gap: 4px;
`;
const BlackText = styled.p`
  color: ${color.black};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-left: 4px;
`;

const H1 = styled.h1`
  color: ${color.black};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
const StoryItemBox = styled.div`
  border-bottom: 1px solid #252525;
  width: 680px;
  height: 60px;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    height: 100%;
    padding-top: 10px;
  }
`;
const Number = styled.div`
  display: flex;
  margin-right: 25px;
  margin-left: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${color.pointcolor};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 520px;
  margin-right: 50px;
`;
const Strong = styled.strong`
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
const Time = styled.time`
  color: #3e415b;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
function ShowStoryList({
  essay,
  title,
  nickname,
}: {
  essay: any[];
  title: string;
  nickname?: string;
}) {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const navigateToEssay = (id?: number, status?: string) => {
    const essayId = id || 0;
    if (essayId) {
      router.push(`/web/essay_details?id=${essayId}&pageType=${status}`);
    }
  };
  return (
    <>
      {essay.length > 0 ? (
        <>
          {" "}
          <StoryInfo>
            <BlackText>{essay?.length}편의 글</BlackText>
            <H1>{title}</H1>
            <BlackText>{nickname ? nickname : user?.nickname} 아무개</BlackText>
          </StoryInfo>
          {essay.map((item: any, index: number) => (
            <StoryItemBox
              key={item.title}
              onClick={() => navigateToEssay(item.id, item.status)}
            >
              <Number>{index + 1}</Number>
              <TitleDiv>
                <Strong>{item.title}</Strong>
                <Time>{formatDateString(item.createdDate)}</Time>
              </TitleDiv>
              {/* <LinkedoutIcon /> */}
            </StoryItemBox>
          ))}
        </>
      ) : (
        <NoneContents text="이 스토리에 에세이가 없거나 모두 비공개 상태입니다." />
      )}
    </>
  );
}

export default ShowStoryList;
