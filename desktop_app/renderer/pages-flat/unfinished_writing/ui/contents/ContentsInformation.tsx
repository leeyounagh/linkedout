import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { BaseButton } from "@/shared/ui/button";

const Layout = styled.div`
  display: flex;
  padding: 15px 40px;
  align-items: center;
  gap: 689px;
  border-bottom: 1px solid rgba(104, 104, 104, 0.1);
`;

const Information = styled.p`
  color: #727070;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const Quentity = styled.data`
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-left: 5px;
`;

interface ContentsInformationProps {
  totalLength: number;
  handleCheckAll: () => void;
}

function ContentsInformation({
  totalLength,
  handleCheckAll,
}: ContentsInformationProps) {
  return (
    <Layout>
      <Information>
        전체
        <Quentity>{totalLength}</Quentity>개
      </Information>
      <BaseButton onClick={handleCheckAll}>전체 삭제</BaseButton>
    </Layout>
  );
}

export default ContentsInformation;
