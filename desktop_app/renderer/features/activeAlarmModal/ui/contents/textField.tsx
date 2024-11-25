import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { timeAgo } from "@/shared/lib/date";
import { useStore } from "@/shared/store";
import { formatDateToKorean } from "@/shared/lib/date";

const Layout = styled.div`
  width: 250px;
  height: 42px;
  margin-left: 23px;
`;
const Row = styled.div`
  display: flex;
  gap: 4px;
  // align-items: center;
  flex-wrap: wrap;
`;
const P = styled.p`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
    // white-space: nowrap;
`;
const Strong = styled.strong`
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  word-break: break-all;
  // white-space: nowrap;
`;
const Time = styled.time`
  color: #777;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  white-space: nowrap;
`;
interface TextFieldProps {
  createdDate: string;
  title: string;
  type: keyof typeof mapper;
}

const mapper = {
  public: "글을 발견!",
  support: "에 요청하신 지원에 대한 내용이 업데이트 됐어요.",
  linkedout: "글을 찾았어요!",
};

function TextField({ createdDate, title, type }: TextFieldProps) {
  const MaxLength = 15;
  const truncatedText =
    title.length > MaxLength ? title.substring(0, MaxLength) + "..." : title;
  const user = useStore((state) => state.user);
  return (
    <Layout>
      <Row>
        {type === "support" ? (
          <P>
            {formatDateToKorean(createdDate)}
            {mapper[type]}
          </P>
        ) : (
          <P>다른 아무개가 {user?.nickname} 아무개님의</P>
        )}
      </Row>
      {type !== "support" && (
        <Row>
          <Strong>'{truncatedText}'</Strong>
          <P>{mapper[type]} <Time>{timeAgo(createdDate)}</Time> </P>
        </Row>
      )}
    </Layout>
  );
}

export default TextField;
