import React, { SetStateAction, useState, Dispatch } from "react";
import styled from "styled-components";
import BottomSheet from "@/shared/ui/modal/BottomSheet";
import color from "@/shared/styles/color";
import { Button } from "@/shared/ui/button";
import { Story } from "@/shared/types";
import CheckIcon from "@/shared/assets/img/modal_icon/check.svg";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  padding-top: 32px;
`;
const BottomSheetTitle = styled.h1`
  width: 100%;
  height: 87px;
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomSheetItemContainer = styled.div`
  min-height: 180px;
  max-height: 180px;
  overflow-y: auto;
`;
const BottomSheetItemDiv = styled.div`
  display: flex;
  padding: 20px 50px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const Span = styled.span`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
function StoryModal({
  stories,
  handleAddStory,
  isStoryIncluded,
  isStoryChecked,
  deleteInculudedStory,
  addUpdateStory,
  onClose,
  setIsStoryModalOpen,
}: {
  stories: Story[];
  handleAddStory: (id: number) => void;
  isStoryIncluded: boolean;
  isStoryChecked: boolean;
  deleteInculudedStory: () => void;
  addUpdateStory: (storyId: number) => void;
  onClose: () => void;
  setIsStoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleAddUpdateStory = () => {
    let matchedStoryId = stories.filter((item) => item.isIncluded === true)[0]
      ?.id;
    addUpdateStory(matchedStoryId);
  };
 console.log(isStoryIncluded)
  return (
    <>
      <BackgroundContainer>
        <BottomSheet
          isOpen={true}
          size="large"
          isCloseModified={true}
          onClose={onClose}
        >
          <BottomSheetTitle>
            이 글을 어떤 스토리로 추가/변경 할까요?
          </BottomSheetTitle>
          <BottomSheetItemContainer>
            {stories.map((item) => (
              <BottomSheetItemDiv onClick={() => handleAddStory(item.id)}>
                <Span>{item.name}</Span>
                {item.isIncluded && <CheckIcon />}

                {/* 체크아이콘은 클릭했을때 생김 */}
              </BottomSheetItemDiv>
            ))}
          </BottomSheetItemContainer>
          <BtnDiv>
            <Button
              text="스토리에서 삭제"
              type={isStoryIncluded ? "point" : "disable"}
              scale="small"
              onClick={() => {
                if(isStoryIncluded){
                  setIsStoryModalOpen(false);
                  deleteInculudedStory();
                }
              }}
            />
            <Button
              type={
                isStoryChecked
                  ? "point"
                  : isStoryIncluded
                  ? "disable"
                  : "point"
              }
              text="추가/변경"
              scale="small"
              onClick={() => {
                if(isStoryChecked||!isStoryIncluded){
                  setIsStoryModalOpen(false);
                  handleAddUpdateStory();
                }
              }}
            />
          </BtnDiv>
        </BottomSheet>
      </BackgroundContainer>
    </>
  );
}

export default StoryModal;
