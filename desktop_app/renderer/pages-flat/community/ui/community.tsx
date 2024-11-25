import React, { useState } from "react";
import { ActiveSideBar } from "@/features/activesidebar";
import styled from "styled-components";
import { ScrollTop } from "@/shared/ui/scroll";
import Header from "./header/Header";
import Banner from "./banner/Banner";
import EssayList from "./contents/EssayList";
import { Tab } from "@/shared/ui/tab";
import FollowList from "./banner/FollowList";
import Bookmark from "@/features/activeModal/bookmark/ui/Bookmark";
import { ColorToast } from "@/shared/ui/toast";
import { allEssayDelete } from "@/shared/api/bookmark";
import SearchModal from "@/features/activeModal/search/ui/SearchModal";

const Layout = styled.main`
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div<{ activeTab: number }>`
  width: calc(100vw - 270px);
  height: ${({ activeTab }) => (activeTab === 1 ? "" : "696px")};
  flex-shrink: 0;
  background: ${({ activeTab }) => (activeTab === 1 ? "none" : "#d9d9d9")};
  position: absolute;
  top: 32px;
  left: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TabContainer = styled.div`
  margin-top: 10px;
`;
const ToastContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 45%;
  z-index: 800;
`;
function community() {
  const tab = ["랜덤", "구독"];
  const [activeTab, setActiveTab] = useState(0);
  const [toastText, setToastText] = useState("");
  const [isShowToast, setIsShowToast] = useState(false);
  const [isError, setError] = useState(false);
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedFollowId, setSelectedFollowId] = useState<null | number>(null);

  const handleFollowId = (id:number) =>{
    setSelectedFollowId(id)
  }

  const handleChangeActiveTab = (index: number) => {
    setActiveTab(index);
  };

  const renderBanner = ({ activeTab }: { activeTab: number }) => {
    switch (activeTab) {
      case 0:
        return <Banner />;
      case 1:
        return <FollowList handleFollowId={handleFollowId} selectedFollowId={selectedFollowId}/>;
      default:
        return <Banner />;
    }
  };
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
  const deleteSavedEssays = async (ids: number[]) => {
    try {
      const { status } = await allEssayDelete(ids);
      console.log(status);
      if (status === 200) {
        toastHandler("저장된글 수정에 성공했습니다.", false);
      } else {
        toastHandler("에세이 삭제에 실패했습니다.", true);
      }
    } catch (err) {
      toastHandler("에세이 삭제에 실패했습니다.", true);
      console.log(err);
    }
  };

  const modlaHandler = (name: string) => {
    if (name === "bookmark") {
      setSaveModalOpen((prev) => !prev);
    }
    if (name === "search") {
      setSearchModalOpen((prev) => !prev);
    }
  };

  return (
    <Layout>
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
      {isSearchModalOpen && (
        <SearchModal modlaHandler={modlaHandler} pageType="public" />
      )}

      {isSaveModalOpen && (
        <Bookmark
          deleteSavedEssays={deleteSavedEssays}
          modlaHandler={modlaHandler}
        />
      )}
      <ScrollTop bottom="131px" />
      <ActiveSideBar />
      <Container activeTab={activeTab}>
        <Header activeTab={activeTab} modlaHandler={modlaHandler} />
        <TabContainer>
          <Tab
            tabData={tab}
            activeTab={activeTab}
            handleChangeActiveTab={handleChangeActiveTab}
            isBlack={activeTab === 0 ? true : false}
            width="431px"
          />
        </TabContainer>
        {renderBanner({ activeTab })}
        <EssayList isRandomEssay={activeTab === 0} selectedFollowId={selectedFollowId}/>
      </Container>
    </Layout>
  );
}

export default community;
