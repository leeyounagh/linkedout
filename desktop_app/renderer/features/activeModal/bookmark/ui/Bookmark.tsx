import React, { useEffect, useState } from "react";
import DefaultLayout from "../../ui/DefaultLayout";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { getBookmarks } from "@/shared/api/bookmark";
import { Essay } from "@/shared/types";
import { useRouter } from "next/navigation";
import { Virtuoso } from "react-virtuoso";
import { PostCard } from "@/shared/ui/card";
import Check from "@/shared/ui/check/check";
import { Button } from "@/shared/ui/button";

const H1 = styled.h1`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  position: fixed;
  left: 315px;
  top: 35px;
`;
const Btn = styled.button`
  all: unset;
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  cursor: pointer;
  position: fixed;
  right: 20px;
  top: 42px;
`;
const ContentsContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
  margin-top: 19px;
`;
const Wrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
  margin-top: 19px;
`;
const PostCardItemDiv = styled.div`
  display: flex;
`;
const CheckDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  width: 10%;
`;
const BtnDiv = styled.div`
  position: fixed;
  bottom: 60px;
  left: 45%;
`;
const NoneData = styled.div`
  width: 80%;
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

interface ExtendedEssay extends Essay {
  isChecked: boolean;
}
interface BookmarkProps {
  deleteSavedEssays: (ids: number[]) => void;
  modlaHandler: (name: string) => void;
}
function Bookmark({ deleteSavedEssays, modlaHandler }: BookmarkProps) {
  const [list, setList] = useState<ExtendedEssay[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchBookmarks();
  }, [deleteSavedEssays]);

  const fetchBookmarks = async () => {
    try {
      const { data, status, totalPage } = await getBookmarks(page, 20);
      if (status === 200) {
        const updatedData = data.map((item: any) => ({
          ...item,
          isChecked: selectedItems.some((selected) => selected === item.id),
        }));
        setList(updatedData);
        if (totalPage) {
          setTotalPage(totalPage);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const toggleCheck = (id: number) => {
    setSelectedItems((prev) => {
      const isAlreadySelected = prev.includes(id);

      if (isAlreadySelected) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });

    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  const navigateToEssay = (id?: number, status?: string) => {
    const essayId = id || 0;
    if (essayId) {
      router.push(`/web/essay_details?id=${essayId}&pageType=${status}`);
    }
  };
  useEffect(() => {
    if (page > 1) {
      fetchBookmarks();
    }
  }, [page]);
  const loadMore = () => {
    if (totalPage && page >= totalPage) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  return (
    <DefaultLayout modlaHandler={modlaHandler} name="bookmark">
      <H1>저장한글</H1>
      <Btn onClick={handleEdit}>{isEdit ? "완료" : "편집"}</Btn>
      {list.length > 0 ? (
        <ContentsContainer>
          <Wrapper>
            <Virtuoso
              style={{ height: "700px", width: "100%" }}
              data={list}
              endReached={loadMore}
              itemContent={(_, item) => (
                <PostCardItemDiv>
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
                  {isEdit && (
                    <CheckDiv>
                      <Check
                        check={item.isChecked}
                        setCheck={() => toggleCheck(item.id)}
                        type="circle"
                      />
                    </CheckDiv>
                  )}
                </PostCardItemDiv>
              )}
            />
          </Wrapper>
        </ContentsContainer>
      ) : (
        <NoneData>저장된 글이 없습니다.</NoneData>
      )}

      {isEdit && (
        <BtnDiv>
          <Button
            text={`총 ${selectedItems?.length}개 모으기`}
            type={selectedItems?.length > 0 ? "point" : "disable"}
            onClick={
              selectedItems?.length > 0
                ? () => {
                    deleteSavedEssays(selectedItems);
                    setSelectedItems([]);
                  }
                : undefined
            }
          />
        </BtnDiv>
      )}
    </DefaultLayout>
  );
}

export default Bookmark;
