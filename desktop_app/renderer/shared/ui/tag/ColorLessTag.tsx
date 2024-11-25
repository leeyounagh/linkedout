import React from "react";
import styled from "styled-components";

const Tag = styled.div`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 24px;
  border: 1px solid #686868;
  color:#686868;
`;

function ColorLessTag({ text }: { text: string }) {
  return <Tag>{text}</Tag>;
}

export default ColorLessTag;
