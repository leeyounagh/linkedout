import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import VerticalIcon from "@/shared/assets/img/verticalDot.svg";

const TitleDiv = styled.div`
  width: 100%;
  height: 164px;
`;

const HeadTitle = styled.h1`
  color: ${color.pointcolor};
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 51px;
`;
const TextDiv = styled.div`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 170%; /* 27.2px */
  letter-spacing: 0.16px;
  margin-top: 14px;
`;
const PointText = styled.span`
  color: ${color.pointcolor};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 170%; /* 27.2px */
  letter-spacing: 0.16px;
`;

const DescDiv = styled.div`
  padding: 0 130px;
  height: 450px;
`;
const DescItemDiv = styled.div`
  width: 100%;
  height: 32%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  svg {
    margin-top: 17px;
    margin-left: 6px;
  }
`;
const Span = styled.span`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 170%; /* 27.2px */
  letter-spacing: 0.16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const P = styled.p`
  color: ${color.gray};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 23.8px */
  letter-spacing: 0.14px;
`;
const ActiveChip = styled.div`
  display: flex;
  width: 42.606px;
  height: 18px;
  padding: 1px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #ffbb36;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

function ReportCompleted() {
  return (
    <>
      <TitleDiv>
        <HeadTitle>수상한 글 검거 완료</HeadTitle>
        <TextDiv>
          <PointText>아무개들</PointText> 이 보다{" "}
          <PointText>양질의 글</PointText>을 읽을 수 있게 됐어요
          <br />
          신고해주셔서 감사합니다!
        </TextDiv>
        <DescDiv>
          <DescItemDiv>
            <Span>신고 접수</Span>
            <P>
              아무개님의 신고는 링크드아웃의 서비스를 개선하고 유지하는 데 큰
              도움이 돼요.
            </P>
            <VerticalIcon />
          </DescItemDiv>
          <DescItemDiv>
            <Span>
              검토 대기 <ActiveChip>진행중</ActiveChip>
            </Span>
            <P>
              링크드아웃 팀에서는 수상한 글을 꼼꼼하게 심문해 규정을 어긴 글을
              최대한 빠르게 체포하고 있어요.
            </P>
            <VerticalIcon />
          </DescItemDiv>
          <DescItemDiv>
            <Span>검토 완료</Span>
            <P>
              심문이 끝난 후 결과를 알려드려요. 나쁜 글이 확실하다면 글을
              공식적으로 체포했다는 알림을 보내드릴게요!
            </P>
          </DescItemDiv>
        </DescDiv>
      </TitleDiv>
    </>
  );
}

export default ReportCompleted;
