import React, { useEffect, useState } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { Essay } from "@/shared/types";
import { PostCard } from "@/shared/ui/card";
import { useRouter } from "next/navigation";
import { getRandomEssays } from "@/shared/api";
import { Virtuoso } from "react-virtuoso";
import { getFollowingsEssay } from "@/shared/api";
import { getAuthorEssays } from "@/shared/api";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const Layout = styled.article`
  width: calc(100vw - 270px);
  // position: absolute;
  // top: 726px;
  // left: 265px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 80%;
  margin-top: 26px;
`;
const H1 = styled.h1`
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 170%; /* 30.6px */
  letter-spacing: 0.18px;
`;

const P = styled.p`
  color: #696969;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
const TitleDiv = styled.div``;
const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
  margin-top: 19px;
`;
function EssayList({
  isRandomEssay,
  selectedFollowId,
}: {
  isRandomEssay: boolean;
  selectedFollowId: null | number;
}) {
  const [list, setList] = useState<Essay[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  const router = useRouter();

  const getEssayList = async () => {
    try {
      const { data } = await getRandomEssays(10);
      setList((prevData) => [...prevData, ...data]);
    } catch (Err) {
      console.log(Err);
    }
  };
  const fetchFollowingsEssay = async () => {
    try {
      setList([]);
      const { data, totalPage, status } = await getFollowingsEssay(page);

      if (status === 200) {
        setList((prevData) => [...prevData, ...data]);
        setTotalPage(totalPage);
      }
    } catch (Err) {
      console.log(Err);
    }
  };
  const fetchFollowingAutorEssay = async (id: number) => {
    try {
      setList([]);
      if (selectedFollowId) {
        const { data, totalPage, status } = await getAuthorEssays(id);

        if (status === 200) {
          setList((prevData) => [...prevData, ...data]);
          setTotalPage(totalPage);
        }
      }
    } catch (Err) {
      console.log(Err);
    }
  };
  const loadMore = () => {
    if (isRandomEssay) {
      getEssayList();
    } else {
      if (totalPage && page >= totalPage) {
        return;
      }
      setPage((prev) => prev + 1);
    }
  };
  const navigateToEssay = (id?: number, status?: string) => {
    const essayId = id || 0;
    if (essayId) {
      router.push(`/web/essay_details?id=${essayId}&pageType=${status}`);
    }
  };
  useEffect(() => {
    if (isRandomEssay) {
      getEssayList();
    } else {
      if (selectedFollowId) {
        fetchFollowingAutorEssay(selectedFollowId);
      } else {
        fetchFollowingsEssay();
      }
    }
  }, [isRandomEssay, selectedFollowId]);

  useEffect(() => {
    fetchFollowingsEssay();
  }, [page]);

  return (
    <Layout>
      <Wrapper>
        {isRandomEssay && (
          <TitleDiv>
            <H1>랜덤 글</H1>
            <P>수많은 유저들의 진솔하고 다양한 경험을 만나보세요.</P>
          </TitleDiv>
        )}
        <ContentsContainer>
          <Virtuoso
            style={{ height: "700px", width: "100%" }}
            data={list}
            endReached={loadMore}
            itemContent={(_, item) => (
              <PostCard
                key={item.id}
                writer={item.author.nickname}
                title={item.title}
                desc={item.content}
                time={item.createdDate}
                imgUrl={item.thumbnail}
                linkedout={item.status === "linkedout"}
                onClick={() => navigateToEssay(item.id, item.status)}
              />
            )}
          />
        </ContentsContainer>
      </Wrapper>
    </Layout>
  );
}

export default EssayList;
