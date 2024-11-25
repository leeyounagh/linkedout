import React, { useEffect, useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { ActiveSideBar } from "@/features/activesidebar";
import styled from "styled-components";
import ActiveAlramList from "@/features/activeAlarmModal/ui/ActiveAlramList";
import { AlarmButton } from "@/shared/ui/button";
import WriteButtonSVG from "@/shared/assets/img/write_icon.svg";
import Header from "./header/Header";
import List from "./contents/List";
import { ScrollTop } from "@/shared/ui/scroll";
import AddStoryModal from "./contents/story/AddStoryModal";
import { ColorToast } from "@/shared/ui/toast";
import { useDebounce } from "@/shared/lib/debounce";
import { searchEssay } from "@/shared/api";
import { Essay } from "@/shared/types";
import { Tab } from "@/shared/ui/tab";
import { getEssays } from "@/shared/api";
import { SearchModal } from "@/features/activeModal/search";

const Layout = styled.div`
  width: 100vw;
  min-height: 90vh;
  overflow-y: auto;
`;

const StyledWriteButton = styled(WriteButtonSVG)`
  position: fixed;
  left: 92.5%;
  top: 85.89%;
  z-index: 10;
  cursor: pointer;
`;

const ContentsContainer = styled.main<{ ismodalopen: boolean }>`
  width: ${({ ismodalopen }) =>
    ismodalopen ? "calc(100vw - 390px)" : "calc(100vw - 270px)"};
  // min-height: 98vh;
  font-family: Arial, sans-serif;
  position: absolute;
  top: 32px;
  left: ${({ ismodalopen }) => (ismodalopen ? "0" : "259px")};
  transition: width 0.3s ease;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;
const ToastContainer = styled.div`
  position: fixed;
  bottom: 135px;
  left: 43%;
  z-index: 50;
`;

const tabData = ["나만의 글", "발행한 글", "스토리"];
function MyEssay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedStoryId, setStoryId] = useState<number | null>(null);
  const [storedStoryName, setStoredStoryName] = useState("");
  // 스토리 편집시 진입되는 화면에서 스토리 이름을 응답값을 주고 잇지 않아서 state로 임시 저장
  const [toastText, setToastText] = useState("");
  const [isError, setError] = useState(false);
  const [isShowToast, setIsShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [listData, setListData] = useState<Essay[]>([]);
  const [page, setPage] = useState(1);
  const [listCount, setListCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const router = useRouter();
  const handleAlarmButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClick = () => {
    router.push("/web/write_essay");
  };
  const handleStoryModal = () => {
    setIsStoryModalOpen(!isStoryModalOpen);
  };
  useEffect(() => {
    if (!isStoryModalOpen) {
      setStoryId(null);
    }
  }, [isStoryModalOpen]);

  const toastHandler = (text: string, isError: boolean) => {
    setIsShowToast(true);
    setToastText(text);
    setError(isError);
    if (isError) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleChangeActiveTab = (index: number) => {
    setActiveTab(index);
    setPage(1);
  };
  useLayoutEffect(() => {
    if (activeTab !== 2) {
      setListData([]);
      setListCount(0);
      setHasMore(true);
      setPage(1);
      getList();
    }
  }, [activeTab]);

  useEffect(() => {
    if (page > 1 && hasMore && activeTab !== 2) {
      getList();
    }
  }, [page]);

  const getList = async () => {
    try {
      const tabInfo: { [key: number]: string } = {
        0: "private",
        1: "public",
      } as const;
      const pageType = tabInfo[activeTab];
      // pageType: private, public
      const { data, total, totalPage } = await getEssays(page, 5, pageType);
      setListData((prevData) => [...prevData, ...data]);
      setListCount(total);
      if (page >= totalPage) {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const modlaHandler = (name: string) => {
    if (name === "search") {
      setSearchModalOpen((prev) => !prev);
    }
  };

  return (
    <Layout>
      {isSearchModalOpen && (
        <SearchModal modlaHandler={modlaHandler} pageType="private"></SearchModal>
      )}
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

      {!isStoryModalOpen ? (
        <>
          <ScrollTop bottom="131px" />
          <ActiveSideBar isModalOpen={isModalOpen}></ActiveSideBar>
          {isModalOpen && (
            <ActiveAlramList
              isModalOpen={isModalOpen}
              handleAlarmButtonClick={handleAlarmButtonClick}
            />
          )}
          <ContentsContainer ismodalopen={isModalOpen}>
            <Header modlaHandler={modlaHandler}/>
            {!isModalOpen && (
              <>
                <StyledWriteButton onClick={handleClick} />
                <AlarmButton onClick={handleAlarmButtonClick} />
              </>
            )}
            <Tab
              tabData={tabData}
              activeTab={activeTab}
              handleChangeActiveTab={handleChangeActiveTab}
              listCount={listCount}
            />
            <List
              setStoredStoryName={setStoredStoryName}
              handleStoryModal={handleStoryModal}
              setStoryId={setStoryId}
              toastHandler={toastHandler}
              setIsSuccess={setIsSuccess}
              activeTab={activeTab}
              listData={listData}
              setListData={setListData}
              loadMore={loadMore}
              setListCount={setListCount}
              setHasMore={setHasMore}
              getList={getList}
            />
          </ContentsContainer>
        </>
      ) : (
        <AddStoryModal
          handleStoryModal={handleStoryModal}
          selectedStoryId={selectedStoryId}
          setStoryId={setStoryId}
          storedStoryName={storedStoryName}
          setStoredStoryName={setStoredStoryName}
          toastHandler={toastHandler}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      )}
    </Layout>
  );
}

export default MyEssay;
