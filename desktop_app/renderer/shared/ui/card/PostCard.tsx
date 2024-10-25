import React from "react";
import styled from "styled-components";
import { timeAgo } from "@/shared/lib/date";
import Image from "next/image";

const Layout = styled.div`
  width: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
`;

const TitleDiv = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const H1 = styled.h1`
  color: #fff;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const Time = styled.time`
  color: #686868;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
const Desc = styled.p<{ isImageUrl: boolean }>`
  width: ${({ isImageUrl }) => (isImageUrl ? "85%" : "100%")};
  margin-top: 10px;
`;
const Writer = styled.span`
  color: #686868;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  margin-top: 10px;
`;
const ImageDiv = styled.div`
  border-radius: 10px;
  width: 146px;
  height: 146px;
  position: absolute;
  top: 40px;
  right: 0;
`;

function removeHtmlTags(str: string) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}
function PostCard({
  writer,
  title,
  desc,
  time,
  imgUrl,
  onClick
}: {
  writer: string;
  title: string;
  desc: string;
  time: string;
  imgUrl?: string;
  onClick?:()=>void;
}) {
  const MaxLength = 300;
  const truncatedText =
    desc.length > MaxLength ? desc.substring(0, MaxLength) + "..." : desc;
  return (
    <Layout onClick={onClick}>
      {imgUrl && (
        <ImageDiv>
          <Image src={imgUrl} width={146} height={146} alt="thumbnail" />
        </ImageDiv>
      )}
      <TitleDiv>
        <H1>{title}</H1>
        <Time>{timeAgo(time)}</Time>
      </TitleDiv>
      <Desc isImageUrl={imgUrl ? true : false}>
        {removeHtmlTags(truncatedText)}
      </Desc>
      <Writer>{writer}</Writer>
    </Layout>
  );
}

export default PostCard;
