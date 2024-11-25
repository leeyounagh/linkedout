import styled from "styled-components";
import color from "../../styles/color";

interface SButtonProps {
  $borderradius: string;
  $backgroundcolor: string;
  $width: string;
  $height: string;
}

export const SButton = styled.button<SButtonProps>`
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${(props) => props.$borderradius};
  background-color: ${(props) => props.$backgroundcolor};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  color: ${color.black};
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 170%;
`;