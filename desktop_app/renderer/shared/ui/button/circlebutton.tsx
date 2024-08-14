import styled from "styled-components";
import Image, { StaticImageData } from "next/image";
import React from "react";

const Button = styled.button<{
  $bgColor: string;
}>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50px;
  background-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

interface SocialbuttonProps {
  icon: StaticImageData;
  imgwidth: number;
  imgheight: number;
  bgColor: string;
  name?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CircleButton: React.FC<SocialbuttonProps> = ({
  icon,
  imgwidth,
  imgheight,
  bgColor,
  name,
  onClick,
}) => {
  return (
    <Button $bgColor={bgColor} onClick={onClick} name={name}>
      <Image
        src={icon as StaticImageData}
        alt="button Icon"
        width={imgwidth}
        height={imgheight}
      />
    </Button>
  );
};

export default CircleButton;
