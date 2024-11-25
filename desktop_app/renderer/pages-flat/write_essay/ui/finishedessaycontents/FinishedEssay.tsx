import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import BottomSheet from "./BottomSheet";
import Image from "next/image";
import { useStore } from "@/shared/store";
import { base64ToFile } from "../../lib/parsingbase64";
import { isBase64 } from "../../lib/checkBase64";

const Layout = styled.div`
  padding: 72px 147px;
  display: flex;
  flex-direction: column;
`;
const ThumbnailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
`;
const Title = styled.p`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 34px;
`;

const Desc = styled.p`
  color: #b4b4b4;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
const UserName = styled.p`
  color: #686868;
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
const DateTime = styled.time`
  color: #686868;
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;

function FinishedEssay({
  title,
  desc,
  tag,
  location,
  imageFile,
  essayId,
  editorType,
  pageType,
  setImageSrc,
  isTagSave,
  isLocationSave
}: {
  title: string;
  desc: string;
  tag: string[];
  location: string[];
  imageFile: string | File | null;
  essayId: string | null;
  editorType: string | null;
  pageType: string | null;
  setImageSrc: Dispatch<SetStateAction<any>>;
  isTagSave:boolean;
  isLocationSave:boolean;
}) {
  const [thumbnailImage, setThumbnailImage] = useState<any>(null);
  const user = useStore((state) => state.user);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDateTime = `${now.getFullYear()}년 ${String(
      now.getMonth() + 1
    ).padStart(2, "0")}월 ${String(now.getDate()).padStart(2, "0")}일 ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setCurrentDateTime(formattedDateTime);
  }, []);

  useEffect(() => {
    if (!editorType) {
      const currentEssayId = localStorage.getItem("currentEssayId");
      if (currentEssayId) {
        const essayData = JSON.parse(localStorage.getItem("essayData") || "[]");
        const storedEssayData = essayData.find((item: any) => {
          return item.id === currentEssayId && item.imageSrc;
        });
        if (storedEssayData?.imageSrc) {
          setThumbnailImage(storedEssayData?.imageSrc);
        }
      }
    } else {
      const tempThumbnail = localStorage.getItem("tempThumbnail");
      if (tempThumbnail) {
        setThumbnailImage(tempThumbnail ?? null);
        if(isBase64(tempThumbnail)){
          let tempImage = base64ToFile(tempThumbnail, "thumbnail image");
          setImageSrc(tempImage);
        }
      }
    }
  }, []);

  return (
    <Layout>
      <ThumbnailContainer>
        {thumbnailImage && (
          <Image
            src={thumbnailImage}
            alt="Thumbnail"
            width={1200}
            height={460}
          />
        )}
      </ThumbnailContainer>
      <BottomSheet
        tag={tag}
        title={title}
        desc={desc}
        location={location}
        imageFile={imageFile}
        essayId={essayId}
        editorType={editorType}
        pageType={pageType}
        isTagSave={isTagSave}
        isLocationSave={isLocationSave}
      />
      <Title>{title}</Title>
      <Desc dangerouslySetInnerHTML={{ __html: desc }} />
      <UserName>{user?.nickname}</UserName>
      <DateTime>{currentDateTime}</DateTime>
    </Layout>
  );
}

export default FinishedEssay;
