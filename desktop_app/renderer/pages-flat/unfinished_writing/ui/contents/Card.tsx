import React, { useState } from "react";
import styled from "styled-components";
import Check from "@/shared/ui/check/check";
import { formatDateToFullKorean } from "@/shared/lib/date";
import { useRouter } from "next/navigation";

const Layout = styled.div`
  border-bottom: 1px solid rgba(104, 104, 104, 0.1);
  width: 100%;
  display: flex;
  cursor: pointer;
`;
const Title = styled.p`
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  display: flex;
  gap: 12px;
  align-items: center;
`;
const Date = styled.time`
  color: #727070;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const Chip = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  width: 37px;
  height: 16px;
  border-radius: 27px;
  background: #e43446;
  display: flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TitleDiv = styled.div`
  width: 90%;
  display: flex;
  padding: 24px 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const CheckboxDiv = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Card({
  title,
  date,
  isCurrent = false,
  isChecked,
  id,
  handleCheckChange,
  isEdit,
}: {
  title: string;
  date: string;
  isCurrent?: boolean;
  isChecked?: boolean;
  id: string;
  handleCheckChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  isEdit?: boolean;
}) {
  const [check, setCheck] = useState(isChecked || false);
  const router = useRouter();

  const handleCheckClick = () => {
    const newChecked = !check;
    setCheck(newChecked);

    if (handleCheckChange) {
      handleCheckChange(
        {
          target: { checked: newChecked },
        } as React.ChangeEvent<HTMLInputElement>,
        id
      );
    }
  };

  const navigateWritePage = () => {
    localStorage.setItem("currentEssayId", id);
    router.push(`/web/write_essay`);
  };

  return (
    <Layout onClick={navigateWritePage}>
      <TitleDiv>
        <Title>
          {title}
          {isCurrent && <Chip>작성중</Chip>}
        </Title>
        <Date>{formatDateToFullKorean(date)}</Date>
      </TitleDiv>
      {!isCurrent && isEdit ? (
        <CheckboxDiv>
          <Check check={check} setCheck={handleCheckClick} type="circle" />
        </CheckboxDiv>
      ) : null}
    </Layout>
  );
}

export default Card;
