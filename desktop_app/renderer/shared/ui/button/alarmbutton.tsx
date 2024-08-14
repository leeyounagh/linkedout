import React from "react";
import AlarmIcon from "@/shared/assets/img/alarm.svg";
import styled from "styled-components";

interface AlarmButtonProps {
  onClick?: () => void;
}

const Button = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  z-index: 1000;
  position: absolute;
  left:94.78%;
  top:37.63px;
`;

const AlarmButton: React.FC<AlarmButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <AlarmIcon />
    </Button>
  );
};

export default AlarmButton;
