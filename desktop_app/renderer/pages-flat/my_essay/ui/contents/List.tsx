import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Tab } from "@/shared/ui/tab";
import Card from "./Card";
import styled from "styled-components";
import { getEssays } from "@/shared/api";
import { getStories } from "@/shared/api";
import { Essay } from "@/shared/types";
import { deleteEssay } from "@/features/showessaydetails/api";
import StoryList from "./story/list/StoryList";
import { storyType } from "@/shared/types";
import { Virtuoso } from "react-virtuoso";

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
  margin-top: 19px;
`;
const NoneData = styled.div`
  height: 80vh;
  color: #686868;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


function List({
  handleStoryModal,
  setStoryId,
  setStoredStoryName,
  toastHandler,
  setIsSuccess,
  activeTab,
  listData,
  setListData,
  loadMore,
  setListCount,
  setHasMore,
  getList
}: {
  handleStoryModal: () => void;
  setStoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setStoredStoryName: React.Dispatch<React.SetStateAction<string>>;
  toastHandler: (text: string, isError: boolean) => void;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab:number;
  listData: Essay[],
  setListData:React.Dispatch<React.SetStateAction<Essay[]>>,
  loadMore:()=>void;
  setListCount:React.Dispatch<React.SetStateAction<number>>;
  setHasMore:React.Dispatch<React.SetStateAction<boolean>>;
  getList: () => void;
}) {

  const [storyList, setStoryList] = useState<storyType[]>([]);

  useLayoutEffect(() => {
    if (activeTab === 2) {
      getStoryList();
    }
  }, [activeTab]);

  const getStoryList = async () => {
    try {
      const { data } = await getStories();
      setStoryList(data);
      setListCount(data.length);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEssayDelete = async (id: number) => {
    try {
      const { status } = await deleteEssay(id);
      if (status === 200) {
        toastHandler("에세이 삭제에 성공했습니다.", false);
        setListData([]);
        setListCount(0);
        setHasMore(true);
        getList();
      } else {
        toastHandler("에세이 삭제에 실패했습니다.", true);
      }
    } catch (err) {
      toastHandler("에세이 삭제에 실패했습니다.", true);
    }
  };
  return (
    <>
      {listData.length === 0 && activeTab !== 2 ? (
        <NoneData>저장된 글이 없습니다.</NoneData>
      ) : null}
      {/* 추후 스토리 로직 세팅후 활성화 */}
      <ContentsContainer>
        {activeTab !== 2 && listData.length > 0 ? (
          <Virtuoso
            key={activeTab}
            style={{ height: "700px", width: "100%" }}
            data={listData}
            endReached={loadMore}
            itemContent={(index, item) => (
              <Card
                key={item.title}
                data={item}
                type={activeTab === 0 ? "private" : "public"}
                handleEssayDelete={handleEssayDelete}
              />
            )}
          />
        ) : activeTab === 2 ? (
          <StoryList
            handleStoryModal={handleStoryModal}
            storyList={storyList}
            setStoryId={setStoryId}
            getStoryList={getStoryList}
            setStoredStoryName={setStoredStoryName}
            toastHandler={toastHandler}
            setIsSuccess={setIsSuccess}
          />
        ) : null}
      </ContentsContainer>
    </>
  );
}

export default List;
