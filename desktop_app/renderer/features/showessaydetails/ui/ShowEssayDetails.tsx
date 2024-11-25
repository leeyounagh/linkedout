import React, { useEffect, useState } from "react";
import { PrevButton } from "@/shared/ui/button";
import { Article } from "@/shared/ui/article";
import styled from "styled-components";
import TempThumbnail from "@/shared/assets/img/도시.jpg";
import { ColorLessTag } from "@/shared/ui/tag";
import UserProfile from "./contents/UserProfile";
import Contents from "./contents/Contents";
import Menu from "./contents/menu/Menu";
import { getEssayDetail } from "@/shared/api";
import { Essay, Story } from "@/shared/types";
import { ScrollTop } from "@/shared/ui/scroll";
import { addEssayBookMark, deleteEssayBookMark } from "@/shared/api/essay";
import { ColorToast } from "@/shared/ui/toast";
import { useStore } from "@/shared/store";
import { deleteStoryIncludedEssay, addEssayforStory } from "@/shared/api";
import { postFollows } from "@/shared/api";
import { deleteFollow } from "@/shared/api";

const Container = styled.main<{ scale: number }>`
  width: 99vw;
  min-height: 60vh;
  overflow-y: auto;
  zoom: ${({ scale }) => scale};
  overflow-x: hidden;
`;
const ArticleLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const TagDiv = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 50px;
  padding: 29px 147px;
`;

const Divider = styled.div`
  width: 80%;
  background: #1a1a1a;
  height: 12px;
  margin-left: 147px;
`;
const ToastContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 35%;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ShowEssayDetails({
  pageType,
  essayId,
  storyId,
}: {
  pageType: string;
  essayId: number;
  storyId?: number;
}) {
  const [scale, setScale] = useState(1);
  const [essay, setEssay] = useState<Essay | null>(null);
  const [isBookMark, setIsBookMark] = useState(false);
  const [includedStory, setIncludedStory] = useState<Story | null>(null);
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [isError, setError] = useState(false);
  const user = useStore((state) => state.user);

  useEffect(() => {
    getEssayData();
  }, [pageType, essayId, storyId]);

  const getEssayData = async () => {
    try {
      const { data } = await getEssayDetail(
        pageType,
        essayId,
        storyId ? storyId : null
      );
      setEssay(data?.essay || null);
      setIsBookMark(data?.essay?.isBookmarked || false);
      setIncludedStory(data?.essay?.story || null);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleZoomIn = () => setScale(scale + 0.1);
  const handleZoomOut = () => setScale(scale - 0.1);

  const handleBookmarkClick = async () => {
    try {
      const tempToastText = isBookMark
        ? "해당 글의 저장이 해지 되었습니다."
        : "해당 글이 저장됐습니다.";
      const { status } = isBookMark
        ? await deleteEssayBookMark(essayId)
        : await addEssayBookMark(essayId);

      if (status === 201 || status === 200) {
        setIsShowToast(true);
        setIsBookMark(!isBookMark);
        setToastText(tempToastText);
      } else {
        throw Error;
      }
    } catch (err) {
      console.log("err", err);
      setIsShowToast(true);
      setToastText("서버 연결이 불안정합니다. 다시 시도 해주세요.");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const deleteInculudedStory = async () => {
    // 스토리에서 삭제하는api 추후 스토리 만들고나서 구현해야됨
    try {
      if (essayId) {
        const { status } = await deleteStoryIncludedEssay(essayId);

        if (status === 200) {
          setIsShowToast(true);
          setToastText("스토리에서 제외 되었습니다.");
          getEssayData();
        } else {
          setIsShowToast(true);
          setToastText("서버 연결이 불안정합니다. 다시 시도 해주세요.");
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      }
    } catch (err) {
      console.log(err);
      setIsShowToast(true);
      setToastText("서버 연결이 불안정합니다. 다시 시도 해주세요.");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const addUpdateStory = async (storyId: number) => {
    try {
      const { status } = await addEssayforStory(storyId, essayId);
      if (status === 200) {
        setIsShowToast(true);
        setToastText("스토리에 추가 되었습니다.");
        getEssayData();
      } else {
        setIsShowToast(true);
        setToastText("서버 연결이 불안정합니다. 다시 시도 해주세요.");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      setIsShowToast(true);
      setToastText("서버 연결이 불안정합니다. 다시 시도 해주세요.");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const submitFollows = async (isFollow: boolean) => {
    try {
      if (essay) {
        const { status } = isFollow
          ? await deleteFollow(essay.author.id)
          : await postFollows(essay.author.id);
        if (status === 201 || status === 200) {
          const alertText =isFollow ?"구독 취소 되었습니다." :"구독 추가 되었습니다."
          setIsShowToast(true);
          setToastText(alertText);
        }
      }
    } catch (err) {
      console.log("err", err);
      setIsShowToast(true);
      setToastText("서버 연결이 불안정합니다. 다시 시도 해주세요.");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  return (
    <Container scale={scale}>
      <ScrollTop />
      <PrevButton path="/web/main" />
      <ToastContainer>
        <ColorToast
          text={toastText}
          onClose={() => {
            setIsShowToast(false);
          }}
          isShowToast={isShowToast}
          type={isError ? "alert" : "normal"}
        />
      </ToastContainer>

      <Menu
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        scale={scale}
        pageType={pageType}
        essayId={essayId}
        includedStory={includedStory}
        userName={essay?.author?.nickname || "꾸르륵"}
        deleteInculudedStory={deleteInculudedStory}
        addUpdateStory={addUpdateStory}
      />
      <ArticleLayout>
        <Article
          title={essay?.title ?? "제목 없음"}
          desc={essay?.content ?? "내용 없음"}
          date={essay?.updatedDate ?? "2024-09-27T15:18:00.164+09:00"}
          userName={essay?.author?.nickname ?? "링크드아웃아무개"}
          imgUrl={essay?.thumbnail}
          handleBookmarkClick={handleBookmarkClick}
          isBookMark={isBookMark}
          isShowBookmark={
            pageType === "published" &&
            user?.nickname !== essay?.author?.nickname
              ? true
              : false
          }
        />
        <TagDiv>
          {essay?.tags.map((item) => {
            return (
              <>
                <ColorLessTag key={item.id} text={item.name} />
              </>
            );
          })}
        </TagDiv>
      </ArticleLayout>
      {pageType === "published" && (
        <UserProfile
          userName={essay?.author?.nickname || "꾸르륵"}
          profileImage={TempThumbnail.src}
          submitFollows={submitFollows}
        />
      )}
      <Divider />
      <Contents pageType={pageType} storyId={storyId} essayId={essayId} />
    </Container>
  );
}

export default ShowEssayDetails;
