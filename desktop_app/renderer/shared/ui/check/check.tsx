import React from "react";
import Image from "next/image";
import UnCheckImg from "@/shared/assets/img/uncheck.svg";
import CheckImg from "@/shared/assets/img/check.svg";
import styled from "styled-components";
import CircleCheck from "@/shared/assets/img/circlecheck.webp";
import ActiveCircleCheck from "@/shared/assets/img/active_check.webp";
interface CheckProps {
  check?: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  type: "general" | "circle";
}

const CheckboxContainer = styled.div`
  cursor: pointer;
`;
function Check({ check, setCheck, type }: CheckProps) {
  const handleClick = () => {
    setCheck((prevCheck) => !prevCheck);
  };
  const checkBoxMapper: { [key: string]: React.ReactNode } = {
    general: check ? <CheckImg /> : <UnCheckImg />,
    circle: check ? (
      <Image
        src={ActiveCircleCheck}
        alt="Active Circle Check"
        width={34}
        height={34}
      />
    ) : (
      <Image src={CircleCheck} alt="Circle Check" width={34} height={34} />
    ),
  };
  return(
    <CheckboxContainer onClick={handleClick}>
      {checkBoxMapper[type]}
    </CheckboxContainer>
  );
}

export default Check;
