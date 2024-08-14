import { Button } from "@/shared/ui/button";
import ImageRenderer from "./imageRenderer";
import TextRenderer from "./textRenderer";
import { IndicatorBar } from "@/shared/ui/indicator";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface stepType {
  step: "step1" | "step2" | "step3" | "step4";
}

interface textStep {
  title: string;
  desc: string;
  desc2: string;
  desc3?: string;
}

interface TextObj {
  [key: string]: textStep;
}
const textObj: TextObj = {
  step1: {
    title: "오직 나만을 위한 글쓰기",
    desc: "모든 글쓰기 활동은 '필명'으로 진행됩니다.",
    desc2: "여러 관계에서 벗어나",
    desc3: "솔직한 나를 표현해보세요.",
  },
  step2: {
    title: "글의 행방 결정하기",
    desc: "작성한 글은 3가지 방향으로 보낼 수 있어요.",
    desc2: "원하는 방법으로 감정을 해소하세요.",
  },
  step3: {
    title: "에세이 엮기",
    desc: "써두었던 글을 모아",
    desc2: "나만의 에세이 모음집을 만들 수 있어요.",
  },
  step4: {
    title: "다양한 감정 마주하기",
    desc: "타인의 솔직한 글을 읽는 경험을 할 수 있어요.",
    desc2: "문장 속에 담긴 다양한 감정을 마주해보세요",
  },
};

const IndicatorDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 67px;
`;
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 33px;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
function GeneralContent({ step }: stepType) {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push("/web/login");
  };
  return (
    <>
      <Container>
        <ImageRenderer step={step} />
      </Container>
      <TextRenderer text={textObj[step]} />
      <IndicatorDiv>
        <IndicatorBar step={step} />
      </IndicatorDiv>
      {step === "step4" && (
        <ButtonDiv>
          <Button
            text="시작하기"
            style="round_1"
            type="point"
            scale="small"
            onClick={navigateToLogin}
          />
        </ButtonDiv>
      )}
    </>
  );
}

export default GeneralContent;
