import React, { useState } from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #313131;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PointButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const TextButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #313131;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const getPageNumbers = () => {
    const halfPageSize = Math.floor(pageSize / 2);
    let startPage = Math.max(1, currentPage - halfPageSize); // 중앙을 기준으로 하기 위해 절반 크기를 계산
    let endPage = Math.min(totalPages, startPage + pageSize - 1);

    if (endPage - startPage + 1 < pageSize) {
      startPage = Math.max(1, endPage - pageSize + 1);
    }
    // 항상 pageSize만큼 보이도록 계산하는 예외처리

    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 }, // 배열의 길이를 계산 (endPage - startPage + 1)
      (_, index) => startPage + index // 각 인덱스에 대해 startPage부터 시작하는 값을 생성
    );
    return pageNumbers;
  };

  return (
    <>
      {currentPage > 1 && (
        <TextButton onClick={handlePrev}>
          이전
        </TextButton>
      )}

      {getPageNumbers().map((page) =>
        page === currentPage ? (
          <PointButton
            key={page}
            onClick={() => {
              setCurrentPage(page);
              onPageChange(page);
            }}
          >
            {page}
          </PointButton>
        ) : (
          <Button
            key={page}
            onClick={() => {
              setCurrentPage(page);
              onPageChange(page);
            }}
          >
            {page}
          </Button>
        )
      )}

      {currentPage < totalPages && (
        <TextButton onClick={handleNext}>
          다음
        </TextButton>
      )}
    </>
  );
};

export default Pagination;
