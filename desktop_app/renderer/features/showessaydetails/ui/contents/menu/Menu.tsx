import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SpotMenuIcon from "@/shared/assets/img/spotmenuicon.svg";
import { BlackMiniModal } from "@/shared/ui/modal";
import EditIcon from "@/shared/assets/img/modal_icon/pen.svg";
import PublishIcon from "@/shared/assets/img/modal_icon/publish.svg";
import LinkedoutIcon from "@/shared/assets/img/modal_icon/linkedout.svg";
import CheckIcon from "@/shared/assets/img/modal_icon/check.svg";
import DeleteIcon from "@/shared/assets/img/modal_icon/delete.svg";
import ReportIcon from "@/shared/assets/img/modal_icon/report.svg";
import color from "@/shared/styles/color";
import { ColorToast } from "@/shared/ui/toast";
import { useRouter } from "next/router";
import { updateEssayDetail } from "@/shared/api/essay";
import { getStories } from "@/shared/api";
import { deleteEssay } from "@/features/showessaydetails/api";
import { Story } from "@/shared/types";
import DeleteModal from "@/shared/ui/modal/DeleteModal";
import StoryModal from "./StoryModal";
import { useStore } from "@/shared/store";
import ReportModal from "./ReportModal";
import { reportEssay } from "@/shared/api/essay";
import { deleteStoryIncludedEssay } from "@/shared/api";

const MenuIconDiv = styled.div`
  position: fixed;
  top: 35px;
  right: 30px;
  cursor: pointer;
`;
const ModalItem = styled.button<{
  isStory?: boolean;
  isRed?: boolean;
  islast?: boolean;
}>`
  all: unset;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  color: ${({ isStory, isRed }) =>
    isStory ? color.pointcolor : isRed ? color.red : color.white};
  align-items: center;
  border-bottom: ${({ islast }) => (islast ? "none" : "1px solid #1a1a1a")};
  cursor: pointer;
  span {
    width: 120px;
  }
`;
const IconDiv = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  svg {
    cursor: pointer;
  }
`;
const ToastDiv = styled.div`
  position: fixed;
  bottom: 135px;
  left: 35%;
  z-index: 50;
`;

function Menu({
  handleZoomIn,
  handleZoomOut,
  scale,
  pageType,
  essayId,
  includedStory,
  userName,
  deleteInculudedStory,
  addUpdateStory
}: {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  scale: number;
  pageType: string;
  essayId: number;
  includedStory: Story | null;
  userName: string;
  deleteInculudedStory:() =>void;
  addUpdateStory:(storyId:number) =>void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [isStoryIncluded, setIsStoryIncluded] = useState(false);
  const [isStoryChecked, setIsStoryChecked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toastText, setToastText] = useState("");
  const [isError, setIsError] = useState(false);
  const user = useStore((state) => state.user);
  const [isShowReport, setIsShowReport] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getStoryList();
    if (includedStory) {
      setIsStoryIncluded(true);
    }
  }, [includedStory]);





  const getStoryList = async () => {
    try {
      const { data } = await getStories();
      const updatedStories = data.map((story) => ({
        ...story,
        isIncluded: includedStory ? story.id === includedStory.id : false,
      }));

      setStories(updatedStories);
    } catch (err) {
      console.log(err);
    }
  };
  const submitReport = async (reason: string) => {
    try {
      const { status } = await reportEssay(essayId, reason);
      return status;
    } catch (err) {
      // toast
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      setToastText("서버와의 연결이 불안정 합니다. 잠시후 다시 시도 해주세요.");
      return 500;
    }
  };
  const toastHandler = (error: boolean) => {
    if (error) {
      setShowToast(true);
      setIsError(true);
      setToastText("에세이 삭제에 실패했습니다.");
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } else {
      setShowToast(true);
      setToastText("에세이 삭제에 성공했습니다.");
      setTimeout(() => {
        router.push("/web/main");
      }, 2000);
    }
  };
  const handleEssayDelete = async () => {
    try {
      const { status } = await deleteEssay(essayId);

      if (status === 200) {
        toastHandler(false);
      } else {
        toastHandler(true);
      }
    } catch (err) {
      toastHandler(true);
    }
  };
  const storyModalHandler = () => {
    setIsMenuOpen(false);
    if (stories.length === 0) {
      setShowToast(true);
      setToastText("아직 만들어진 스토리가 없습니다.");
    } else {
      setIsStoryModalOpen(!isStoryModalOpen);
    }
  };
  const reportModalHandler = () => {
    setIsShowReport(!isShowReport);
  };

  const handleAddStory = (id: number) => {
    setIsStoryChecked(!isStoryChecked);
    const hasIncludedStory = stories.some((story) => story.isIncluded);
    setStories((prevStories) =>
      prevStories.map((story) =>
        hasIncludedStory
          ? story.id === id && story.isIncluded
            ? { ...story, isIncluded: !story.isIncluded }
            : story
          : story.id === id
          ? { ...story, isIncluded: !story.isIncluded }
          : story
      )
    );
  };

  const navigateToEditor = () => {
    router.push(
      `/web/write_essay?pageType=${pageType}&editorType=edit&essayId=${essayId}`
    );
  };
  const updateEssayDetails = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = e.currentTarget as HTMLButtonElement;
    const id = target.dataset.id;
    try {
      const { status } = await updateEssayDetail(null, { status: id }, essayId);
      if (status === 200) {
        router.push(
          `/web/essay_details?id=${essayId}&type=${id}&pageType=public`
        );
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const MyEssayRenderer = () => {
    return (
      <>
        <ModalItem isStory={false} onClick={navigateToEditor}>
          <span>수정</span>
          <IconDiv>
            <EditIcon />
          </IconDiv>
        </ModalItem>
        {pageType !== "public" && (
          <ModalItem
            isStory={false}
            data-id="published"
            onClick={(e) => updateEssayDetails(e)}
          >
            <span>발행</span>
            <IconDiv>
              <PublishIcon />
            </IconDiv>
          </ModalItem>
        )}
        <ModalItem
          isStory={false}
          data-id="linkedout"
          onClick={(e) => updateEssayDetails(e)}
        >
          <span>Linked-out</span>
          <IconDiv>
            <LinkedoutIcon />
          </IconDiv>
        </ModalItem>
        <ModalItem isStory={true} onClick={storyModalHandler}>
          <span>스토리 선택</span>
          <IconDiv>
            <CheckIcon />
          </IconDiv>
        </ModalItem>
        <ModalItem
          isStory={false}
          isRed={true}
          onClick={() => {
            setIsMenuOpen(false);
            setIsDeleteModalOpen(!isDeleteModalOpen);
          }}
          islast={true}
        >
          <span>삭제</span>
          <IconDiv>
            <DeleteIcon />
          </IconDiv>
        </ModalItem>
      </>
    );
  };

  const essayRenderer = () => {
    return (
      <>
        {userName !== user?.nickname && (
          <ModalItem
            isStory={false}
            isRed={true}
            onClick={() => {
              setIsShowReport(!isShowReport);
              setIsMenuOpen(false);
            }}
            islast={true}
          >
            <span>신고하기</span>
            <IconDiv>
              <ReportIcon />
            </IconDiv>
          </ModalItem>
        )}
      </>
    );
  };
  return (
    <>
      {stories.length > 0 && isStoryModalOpen ? (
        <StoryModal
          stories={stories}
          handleAddStory={handleAddStory}
          isStoryChecked={isStoryChecked}
          isStoryIncluded={isStoryIncluded}
          deleteInculudedStory={deleteInculudedStory}
          addUpdateStory={addUpdateStory}
          onClose={storyModalHandler}
          setIsStoryModalOpen={setIsStoryModalOpen}
        />
      ) : null}
      {isShowReport && (
        <ReportModal
          onClose={reportModalHandler}
          isShowModal={isShowReport}
          submitReport={submitReport}
        />
      )}
      <ToastDiv>
        <ColorToast
          text={toastText}
          onClose={() => {
            setShowToast(false);
          }}
          isShowToast={showToast}
          type={isError ? "alert" : "normal"}
        />
      </ToastDiv>
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleEssayDelete={handleEssayDelete}
      />
      {isMenuOpen && (
        <BlackMiniModal
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          scale={scale}
          onClose={() => setIsMenuOpen(false)}
        >
          {userName !== user?.nickname ? essayRenderer() : <MyEssayRenderer />}
        </BlackMiniModal>
      )}
      <MenuIconDiv onClick={(e) => handleMenuOpen(e)} id="not-include">
        <SpotMenuIcon alt="menu_icon" />
      </MenuIconDiv>
    </>
  );
}

export default Menu;
