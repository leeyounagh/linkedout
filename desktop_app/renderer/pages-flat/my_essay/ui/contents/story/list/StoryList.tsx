import React, { useState } from "react";
import styled from "styled-components";
import PlusBtn from "@/shared/assets/img/plus.webp";
import Image from "next/image";
import color from "@/shared/styles/color";
import BigLogo from "@/shared/assets/img/big_logo.webp";
import StoryCard from "./StoryCard";
import { storyType } from "@/shared/types";
import { deleteStory } from "@/shared/api";

const Layout = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
  background-image: url(${BigLogo.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 320.5px 266px;
`;

const AddButton = styled.button`
  all: unset;
  width: 670px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #252525;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
`;
const P = styled.p`
  color: #909090;
  text-align: left;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 34.09px;
  margin-left: 14px;
  width: 100%;
`;

function StoryList({
  handleStoryModal,
  storyList,
  setStoryId,
  getStoryList,
  setStoredStoryName,
  toastHandler,
  setIsSuccess
}: {
  handleStoryModal: (id?: number) => void;
  storyList: storyType[];
  setStoryId: React.Dispatch<React.SetStateAction<number | null>>;
  getStoryList: () => void;
  setStoredStoryName: React.Dispatch<React.SetStateAction<string>>;
  toastHandler: (text: string, error: boolean) => void;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const deleteStoryInfo = async (id: number) => {
    try {
      const { status } = await deleteStory(id);
      if (status === 200) {
        toastHandler("스토리 삭제에 성공했습니다.", false);
        await getStoryList();
      } else {
        toastHandler("스토리 삭제에 실패했습니다.", false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <AddButton onClick={() => handleStoryModal()}>
        <Image src={PlusBtn.src} width={24} height={24} alt="plus_btn_icon" />
      </AddButton>
      {storyList.length === 0 ? (
        <P>썼던 글을 모아 스토리를 만들어보세요!</P>
      ) : (
        <>
          {storyList.map((story) => (
            <StoryCard
              key={story.name}
              story={story}
              handleStoryModal={handleStoryModal}
              setStoryId={setStoryId}
              deleteStoryInfo={deleteStoryInfo}
              setStoredStoryName={setStoredStoryName}
              setIsSuccess={setIsSuccess}
            />
          ))}
        </>
      )}
    </Layout>
  );
}

export default StoryList;
