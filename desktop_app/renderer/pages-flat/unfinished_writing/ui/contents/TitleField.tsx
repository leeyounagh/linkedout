import React from "react";
import { PrevButton } from "@/shared/ui/button";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { useRouter } from "next/router";

const Layout = styled.div`
  width: 100vw;
  height: 80px;
  border-bottom: 1px solid rgba(104, 104, 104, 0.3);
  background: #121212;
  position: relative;
`;
const Title = styled.p`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  position: absolute;
  top: 38px;
  left: 45%;
`;
const Button = styled.button`
  all: unset;
  color: ${color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  position: absolute;
  top: 38px;
  right: 18px;
  cursor: pointer;
`;
function TitleField({
  handleEdit,
  isEdit,
}: {
  handleEdit: () => void;
  isEdit: boolean;
}) {
  const router = useRouter();
  const { query } = router;
  const id = query.id as string | undefined;
  const path = id ? `/web/write_essay?id=${id}` : "/web/write_essay";

  return (
    <Layout>
      <PrevButton path={path} />
      <Title>쓰다 만 글</Title>
      <Button onClick={handleEdit}>{isEdit ? "완료" : "편집"}</Button>
    </Layout>
  );
}

export default TitleField;
