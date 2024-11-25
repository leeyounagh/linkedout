import React, { useState } from "react";
import styled from "styled-components";
import SummaryIcon from "@/shared/assets/img/summaryIcon.svg";
import SpotMenuIcon from "@/shared/assets/img/spotmenuicon.svg";
import color from "@/shared/styles/color";
import { BlackMiniModal } from "@/shared/ui/modal";
import { storyType } from "@/shared/types";

const Layout = styled.div`
  width: 650px;
  border-bottom: 1px solid rgba(104, 104, 104, 0.3);
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const SummaryDiv = styled.div`
  position: relative;
`;
const Title = styled.h1`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-left: 34.72px;
  width: 510px;
  margin-right: 20px;
`;
const Count = styled.p`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(20px, -5px);
`;
const MenuIconDiv = styled.div`
  position: relative;
`;

const ModalItem = styled.button<{ isdelete: boolean; islast?: boolean }>`
  all: unset;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ isdelete }) => (isdelete ? "red" : color.white)};
  align-items: center;
  border-bottom: ${({ islast }) => (islast ? "none" : "1px solid #1a1a1a")};
  cursor: pointer;
  span {
    width: 100px;
    margin-left: 5px;
  }
`;
function StoryCard({
  story,
  handleStoryModal,
  setStoryId,
  deleteStoryInfo,
  setStoredStoryName,
  setIsSuccess,
}: {
  story: storyType;
  handleStoryModal: (id?: number) => void;
  setStoryId: React.Dispatch<React.SetStateAction<number | null>>;
  deleteStoryInfo: (id: number) => void;
  setStoredStoryName: React.Dispatch<React.SetStateAction<string>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const navigateDetails = () => {
    setIsSuccess(true);
    setStoryId(story.id);
    handleStoryModal();
  };
  return (
    <Layout>
      <SummaryDiv onClick={navigateDetails}>
        <SummaryIcon />
        <Count>{story.essaysCount}</Count>
      </SummaryDiv>

      <Title onClick={navigateDetails}>{story.name}</Title>
      <MenuIconDiv onClick={handleModalOpen}>
        <SpotMenuIcon />
        {isModalOpen && (
          <BlackMiniModal
            isabsolute={true}
            top="30px"
            right="10px"
            isNoneActiveOutside={true}
          >
            <ModalItem
              isdelete={false}
              onClick={() => {
                setStoryId(story.id);
                setStoredStoryName(story.name);
                handleStoryModal();
              }}
            >
              스토리 편집
            </ModalItem>
            <ModalItem
              isdelete={true}
              islast={true}
              onClick={() => deleteStoryInfo(story.id)}
            >
              스토리 삭제
            </ModalItem>
          </BlackMiniModal>
        )}
      </MenuIconDiv>
    </Layout>
  );
}

export default StoryCard;
