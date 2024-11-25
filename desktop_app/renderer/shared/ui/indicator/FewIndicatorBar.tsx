import React, { useState } from "react";
import PointDot from "@/shared/assets/img/indicator/pointDot.svg";
import Dot from "@/shared/assets/img/indicator/dot.svg";
import styled from "styled-components";

const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    background-color: #0a0a0a;
    border-radius: 50px;
    padding: 10px 10px;
  }
`;

function FewIndicatorBar({
  totalpage,
  onClick,
}: {
  totalpage: number;
  onClick?: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const handleClick = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalpage);
    if (onClick) {
      onClick();
    }
  };
  return (
    <Container onClick={handleClick}>
      {[...Array(totalpage)].map((_, index) => (
        <React.Fragment key={`indicator-${index}`}>
          {index === currentPage ? <PointDot /> : <Dot />}
        </React.Fragment>
      ))}
    </Container>
  );
}

export default FewIndicatorBar;
