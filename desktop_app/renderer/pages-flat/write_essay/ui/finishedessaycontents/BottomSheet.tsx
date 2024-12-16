import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@/shared/ui/modal/BottomSheet";
import color from "@/shared/styles/color";
import NextBtnImg from "@/shared/assets/img/next_Icon.svg";
import { changeGroupChain, changeSingleChain } from "../../lib/changeChain";
import { useRouter } from "next/navigation";
import Savebtn from "@/shared/assets/img/button/button_save.webp";
import PublishBtn from "@/shared/assets/img/button/button_publish.webp";
import LinkedoutBtn from "@/shared/assets/img/button/button_linkedout.webp";
import Image from "next/image";
import { submitEssay } from "../../api";
import { updateEssayDetail } from "@/shared/api/essay";
import { ColorToast } from "@/shared/ui/toast";

const Layout = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.isOpen ? "rgba(0, 0, 0, 0.8)" : "")};
  z-index: ${(props) => (props.isOpen ? "999" : "0")};
`;
const Wrapper = styled.div``;

const TopNavigatorDiv = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavigatorChip = styled.div`
  border-radius: 15px;
  background: #8a8a8a;
  width: 40px;
  height: 5px;
  flex-shrink: 0;
  cursor: pointer;
`;
const P = styled.p`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const TitleDiv = styled.div`
  margin-top: 50px;
`;
const StepTwoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const LoopDiv = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const LoopWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  height: 100%;
  position: relative;
`;

const Strong = styled.strong`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-decoration-line: underline;
`;
const NextBtn = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 60px;
  right: 41px;
`;
const PrevBtn = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 60px;
  left: 41px;
  .prev-btn {
    transform: scaleX(-1);
  }
`;

const ChainDiv = styled.div<{ isReversing?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .forward-click-able {
    cursor: ${({ isReversing }) => (isReversing ? "default" : "pointer")};
  }

  .reverse-click-able {
    cursor: ${({ isReversing }) => (isReversing ? "pointer" : "default")};
  }
`;

const GroupChainDiv = styled.div``;
const StepTwoWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 31px;
  img {
    cursor: pointer;
  }
`;

const SingleChainDiv = styled.div``;

const BtnDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const ToastContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 37%;
  z-index: 2000;
`;
export interface Essay {
  id: string;
  title: string;
  timestamp: string;
  checked: boolean;
}
interface bodyType {
  title: string;
  content: string;
  status: string;
  tags: string[];
  location?: string;
  thumbnail?: string;
}
function BottomSheet({
  tag,
  title,
  desc,
  location,
  imageFile,
  essayId,
  editorType,
  pageType,
  isTagSave,
  isLocationSave,
}: {
  tag: string[];
  title: String;
  desc: string;
  location: string[];
  imageFile: File | string | null;
  essayId: string | null;
  editorType: string | null;
  pageType: string | null;
  isTagSave: boolean;
  isLocationSave: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [chainStep, setChainStep] = useState("zero");
  const [isReversing, setIsReversing] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const currentId = localStorage.getItem("currentEssayId");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleChainStep = () => {
    const chainStepArr = ["zero", "one", "two", "three", "four"];
    const currentIndex = chainStepArr.findIndex((s) => s === chainStep);

    let nextStep;

    if (isReversing) {
      if (currentIndex === 0) {
        setIsReversing(false);
        nextStep = chainStepArr[currentIndex + 1];
      } else {
        if (currentIndex === 1) {
          setIsReversing(false);
        }
        nextStep = chainStepArr[currentIndex - 1];
      }
    } else {
      if (currentIndex === chainStepArr.length - 1) {
        // 마지막인덱스일때 뒤집어준다.
        setIsReversing(true);
        nextStep = chainStepArr[currentIndex - 1];
      } else {
        nextStep = chainStepArr[currentIndex + 1];
      }
    }

    setChainStep(nextStep);
  };

  const stepOneRenderer = () => {
    return (
      <>
        <TitleDiv>
          <P>
            이 <Strong>글을 쓰면서 풀어낸 마음</Strong> 만큼
          </P>
          <P>고리를 풀어주세요.</P>
        </TitleDiv>
        <LoopDiv>
          <LoopWrapper>
            <ChainDiv isReversing={isReversing}>
              <GroupChainDiv
                onClick={isReversing ? undefined : handleChainStep}
              >
                {changeGroupChain(chainStep)}
              </GroupChainDiv>
              <SingleChainDiv
                onClick={isReversing ? handleChainStep : undefined}
              >
                {changeSingleChain(chainStep)}
              </SingleChainDiv>
            </ChainDiv>
          </LoopWrapper>
          <NextBtn onClick={stepHandler}>
            <NextBtnImg alt="Next" />
          </NextBtn>
        </LoopDiv>
        {isTagSave && (
          <TagDiv>
            {tag.map((item) => (
              <P>{item}</P>
            ))}
          </TagDiv>
        )}
      </>
    );
  };

  const handleSaveEssay = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const { id } = e.currentTarget.dataset;
      const geuloqueUrl = localStorage.getItem("geuloqueUrl");
      const isGueloque = geuloqueUrl && geuloqueUrl.length > 0 ? true : false;
      const pageType = id === "private" ? "private" : "public";
      if (title.length === 0 || desc.length === 0) {
        showToastMessage("입력란을 확인해 주세요.");
        return;
      }

      const formData = new FormData();

      if (imageFile && !isGueloque) {
        formData.append("image", imageFile);
      }
      const body: bodyType = {
        title: String(title),
        content: String(desc),
        status: String(id),
        tags: isTagSave ? tag : [],
        location: "",
        thumbnail: isGueloque ? geuloqueUrl || "" : "", 
      };


      if (location.length > 0) {
        const tempLocation = location[0];
        if (tempLocation && isLocationSave) {
          const numbersOnly = tempLocation.match(/[\d.]+/g)?.join(", ");
          body.location = String(numbersOnly);
        } else {
          delete body?.location;
        }
      } else {
        delete body?.location;
      }

      const { data, status } = await submitEssay(formData, body, isGueloque);

      if (status === 201) {
        const storedData = JSON.parse(
          localStorage.getItem("essayData") || "[]"
        );
        let deleteSaveData = storedData.filter(
          (item: Essay) => item.id !== currentId
        );
        localStorage.setItem("essayData", JSON.stringify(deleteSaveData));
        localStorage.setItem("currentEssayId", "");
        localStorage.setItem("tempThumbnail", "");
        localStorage.setItem("geuloqueUrl", "");
        router.push(
          `/web/essay_details?id=${data.id}&type=${id}&pageType=${pageType}`
        );
      } else {
        showToastMessage("게시물 등록에 실패했습니다.");
      }
    } catch (err) {
      console.log("err", err);
      showToastMessage("게시물 등록에 실패했습니다.");
    }
  };
  const updateSavedEssay = async (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset;
    try {
      const body: bodyType = {
        title: String(title),
        content: String(desc),
        status: String(pageType),
        tags: isTagSave ? tag : [],
        location: "",
      };
      if (location.length > 0) {
        const tempLocation = location[0];
        if (tempLocation && isLocationSave) {
          const numbersOnly = tempLocation.match(/[\d.]+/g)?.join(", ");
          body.location = String(numbersOnly);
        } else {
          delete body?.location;
        }
      } else {
        delete body?.location;
      }
      const formData = new FormData();
      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }
      const { status } = await updateEssayDetail(
        formData,
        body,
        Number(essayId)
      );
      if (status === 200) {
        localStorage.setItem("tempThumbnail", "");
        router.push(
          `/web/essay_details?id=${essayId}&type=${id}&pageType=${pageType}`
        );
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 3000);
  };

  const saveOrUpdateEssay = (e: React.MouseEvent<HTMLElement>) => {
    if (editorType === "edit") {
      updateSavedEssay(e);
    } else {
      handleSaveEssay(e);
    }
  };
  const stepTwoRenderer = () => {
    return (
      <StepTwoContainer>
        <TitleDiv>
          <P>이 글을 어떻게 할까요?</P>
        </TitleDiv>
        <StepTwoWrapper>
          <PrevBtn>
            <NextBtnImg className="prev-btn" alt="Prev" onClick={stepHandler} />
          </PrevBtn>
          <BtnDiv>
            <Image
              src={Savebtn.src}
              width={340}
              height={60}
              alt="save_btn"
              data-id="private"
              onClick={saveOrUpdateEssay}
            />
            <Image
              src={PublishBtn.src}
              width={340}
              height={60}
              alt="publish_btn"
              data-id="published"
              onClick={saveOrUpdateEssay}
            />
            <Image
              src={LinkedoutBtn.src}
              width={340}
              height={60}
              alt="linkedout_btn"
              data-id="linkedout"
              onClick={saveOrUpdateEssay}
            />
          </BtnDiv>
        </StepTwoWrapper>
      </StepTwoContainer>
    );
  };
  const stepHandler = () => {
    if (step === 1) {
      setStep(2);
    }
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <Layout isOpen={isOpen}>
      <ToastContainer>
        <ColorToast
          type="alert"
          text={toastMessage}
          onClose={() => setShowToast(false)}
          isShowToast={showToast}
        />
      </ToastContainer>
      <Modal isOpen={isOpen} size="large">
        <Wrapper onClick={handleDialogClick}>
          <TopNavigatorDiv>
            <NavigatorChip onClick={handleModalOpen}></NavigatorChip>
          </TopNavigatorDiv>
          {step === 2 ? stepTwoRenderer() : stepOneRenderer()}
        </Wrapper>
      </Modal>
    </Layout>
  );
}

export default BottomSheet;
