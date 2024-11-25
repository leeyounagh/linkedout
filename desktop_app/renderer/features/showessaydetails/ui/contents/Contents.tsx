import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PostCard } from "@/shared/ui/card";
import TempThumbnail from "@/shared/assets/img/도시.jpg";
import { IndicatorBar } from "@/shared/ui/indicator";
import { Essay } from "@/shared/types";
import { useRouter } from "next/navigation";
import { getEssays } from "@/features/showessaydetails/api";
import { FewIndicatorBar } from "@/shared/ui/indicator";
import NextIcon from "@/shared/assets/img/indicator/next.svg";
import { getRandomEssays } from "@/features/showessaydetails/api";
import { Pagination } from "@/shared/ui/pagination";
import { getNextEssay } from "@/features/showessaydetails/api";

const Layout = styled.div`
  padding: 20px 147px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  all: unset;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  box-shadow: none;
  color: #616fed;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 170%;
  letter-spacing: 0.16px;
  cursor: pointer;
`;
const IndicatorDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .indicator {
    cursor: pointer;
    padding: 10px 10px;
  }
  .indicator:hover {
    background-color: #0a0a0a;
    border-radius: 50px;
  }
`;
const NoneContentsDiv = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const P = styled.div`
  color: #424242;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const NextBtn = styled.button`
  border: none;
  background: none;
  color: inherit;
  padding: 0;
  cursor: pointer;
  display: flex;
  // gap: 4px;
  align-items: center;
  color: #686868;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:hover {
    border-bottom: 1px solid #313131;
  }
`;
const IndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
function Contents({
  pageType,
  storyId,
  essayId,
}: {
  pageType: string;
  storyId?: number;
  essayId: number;
}) {
  const router = useRouter();
  const [essays, setEssay] = useState<Essay[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [step, setStep] = useState("step1");
  const [isIncreasing, setIsIncreasing] = useState(true);

  const getStepFromPage = () => {
    switch (true) {
      case page === 1:
        return "step1";
      case page === 2:
        return "step2";
      case page === 3:
        return "step3";
      case page >= 4:
        return "step4";
      default:
        return "step1";
    }
  };
  useEffect(() => {
    getEssayList();
  }, [essayId, pageType]);

  useEffect(() => {
    const newStep = getStepFromPage();
    setStep(newStep);
    getEssayList();
  }, [page]);
  // private일때 api
  const getEssayList = async () => {
    try {
      if (pageType === "public" ||pageType === "published") {
        const { data } = await getRandomEssays();
        setEssay(data);
        setTotalPage(4);
      } else {
        const { data, totalPage } = await getEssays(page, 4, pageType);
        setEssay(data);
        setTotalPage(totalPage);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getNextData = async () => {
    try {
      const { data, status } = storyId
        ? await getNextEssay(essayId, pageType, storyId)
        : await getNextEssay(essayId, pageType);
      if (status === 200) {
        if (!storyId) {
          router.push(`/web/essay_details?id=${data.id}&pageType=${pageType}`);
        } else {
          router.push(
            `/web/essay_details?id=${data.id}&pageType=${pageType}&storyId=${storyId}`
          );
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const NoneContents = () => {
    return (
      <NoneContentsDiv>
        <P>아직 발행된 글이 없습니다..</P>
      </NoneContentsDiv>
    );
  };
  const navigateToEssay = (id?: number) => {
    const essayId = id || 0;
    if (essayId) {
      router.push(`/web/essay_details?id=${essayId}&pageType=${pageType}`);
    }
  };

  const handleIndicatorPageChange = () => {
    if (isIncreasing) {
      // 페이지가 증가할때
      if (page < totalPage) {
        setPage((prevPage) => prevPage + 1);
      } else if (page === totalPage) {
        setIsIncreasing(false);
        setPage((prevPage) => prevPage - 1);
      }
    } else {
      if (page > 1) {
        setPage((prevPage) => prevPage - 1);
      } else if (page === 1) {
        setIsIncreasing(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const IndicatorRenderer = () => {
    console.log("pageType",pageType)
    switch (true) {
      case pageType === "private":
        return (
          <Pagination totalPages={totalPage} onPageChange={handlePageChange} />
        );
      case pageType === "public" || pageType === "published":
        return <IndicatorBar step={step} onClick={handleIndicatorPageChange} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Button onClick={getNextData}>
        {pageType === "private" ? "이전 글" : "다른 글"}
      </Button>
      {essays.length === 0 ? (
        <NoneContents />
      ) : (
        essays.map((item) => (
          <PostCard
            key={item.id}
            writer={item.author.nickname}
            title={item.title}
            desc={item.content}
            time={item.createdDate}
            imgUrl={item.thumbnail}
            onClick={() => navigateToEssay(item.id)}
          />
        ))
      )}
      {/* 인디케이터 자리 */}
      <IndicatorDiv>
        {/*  pageType이 private일때만 페이지네이션  public일땐 인디케이터바만 */}
        {IndicatorRenderer()}
      </IndicatorDiv>
    </Layout>
  );
}

export default Contents;
