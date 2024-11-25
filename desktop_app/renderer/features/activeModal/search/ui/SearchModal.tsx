import React, { useState } from "react";
import styled from "styled-components";
import DefaultLayout from "../../ui/DefaultLayout";
import WhiteSearch from "@/shared/assets/img/search.svg";
import { PostCard } from "@/shared/ui/card";
import { useDebounce } from "@/shared/lib/debounce";
import { searchEssay } from "@/shared/api";
import { useRouter } from "next/router";
import { Essay } from "@/shared/types";

const InputContainer = styled.div`
  position: fixed;
  top: 35px;
  left: 561px;
  width: 627px;
  height: 46px;
`;

const StyledInput = styled.input`
  border-radius: 42px;
  background: #222;
  width: 100%;
  height: 100%;
  padding: 8px 20px 8px 50px; /* 왼쪽 패딩 조정 */
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;
`;

const Icon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListLayout = styled.div`
  width: 80%;
  height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListItemDiv = styled.div`
  width: 80%;
  margin-top: 30px;
`;

function SearchModal({
  modlaHandler,
  pageType
}: {
  modlaHandler: (name: string) => void;
  pageType:string;
}) {
  const [listData, setListData] = useState<Essay[]>([]);
  const router = useRouter();
  const { debouncedFunction } = useDebounce((term: string) => {
    searchEssay(pageType, term)
      .then((response) => {
        setListData(response.data);
      })
      .catch((error) => {
        console.error("API 호출 오류:", error);
      });
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFunction(event.target.value);
  };
  const navigateToEssay = (id?: number, status?: string) => {
    const essayId = id || 0;
    if (essayId) {
      router.push(`/web/essay_details?id=${essayId}&pageType=${status}`);
    }
  };
  return (
    <DefaultLayout modlaHandler={modlaHandler} name="search">
      <InputContainer>
        <Icon>
          <WhiteSearch />
        </Icon>
        <StyledInput
          placeholder="검색어를 입력하세요."
          onChange={handleSearchChange}
        />
      </InputContainer>
      <ListLayout>
        {listData.map((item) => (
          <ListItemDiv>
            <PostCard
              key={item.id}
              writer=""
              title={item.title}
              desc={item.content}
              time={item.createdDate}
              imgUrl={item.thumbnail}
              linkedout={item.status === "linkedout"}
              onClick={() => navigateToEssay(item.id, item.status)}
            />
          </ListItemDiv>
        ))}
      </ListLayout>
    </DefaultLayout>
  );
}

export default SearchModal;
