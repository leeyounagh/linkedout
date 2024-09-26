import React, { useEffect, useState } from "react";
import { GeneralModal } from "@/shared/ui/modal";
import { Button } from "@/shared/ui/button";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import Reported from "@/shared/assets/img/reported.gif";
import Published from "@/shared/assets/img/published.gif";
import Image from "next/image";
import color from "@/shared/styles/color";

const ChildrenDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;
const ContentsDiv = styled.div`
  width: 200px;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ImgDiv = styled.div`
  width: 128px;
`;

const TitleDiv = styled.div`
  width: 200px;
  height: 41px;
  margin-top: 62px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
`;
const Strong = styled.strong`
  color: ${color.pointcolor};
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
const Span = styled.span`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
const DescDiv = styled.div`
  width: 220px;
  margin-top: 10px;
  // margin-left: 14px;
`;
const P = styled.p`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  word-break: break-word;
`;
const BtnDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 23px;
`;
function CompleteModal() {
  const searchParams = useSearchParams();
  let modalType =  searchParams.get("type") as keyof typeof mapper;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (modalType) {
      setIsOpen(true);
    }
  }, [searchParams]);

  const mapper = {
    private: {
      img: null,
      title: (
        <>
          <Strong>저장</Strong>
          <Span> 완료</Span>
        </>
      ),
      desc: (
        <>
          아무개님의 새 글이 <br />
          '나만의 글'에 저장됐어요!
        </>
      ),
    },
    published: {
      img: (
        <Image
          src={Published.src}
          width={148}
          height={245}
          alt="modal_img"
        ></Image>
      ),
      title: (
        <>
          <Strong>발행</Strong>
          <Span> 완료</Span>
        </>
      ),
      desc: (
        <>
          아무개님의 새 글이 <br />
          숨바꼭질을 시작했어요!
        </>
      ),
    },
    linkedout: {
      img: (
        <Image
          src={Published.src}
          width={128}
          height={245}
          alt="modal_img"
        ></Image>
      ),
      title: (
        <>
          <Strong>링크드아웃</Strong>
          <Span> 완료</Span>
        </>
      ),
      desc: (
        <>
          다시 고쳐 쓸 수도, 찾을 수도 <br />
          없는 글이지만 가장 솔직하고 <br />
          용감한 글이 됐어요
        </>
      ),
    },
    reported: {
      img: (
        <Image
          src={Reported.src}
          width={148}
          height={245}
          alt="modal_img"
        ></Image>
      ),
      title: (
        <>
          <Strong>검토중</Strong>
        </>
      ),
      desc: (
        <>
          아무개님의 새 글을 <br />
          꼼꼼하게 검토중이에요
        </>
      ),
    },
  };
  const handleModalOpen = () => {
    setIsOpen(false)
  }
  console.log("searchParams", searchParams.get("id"));
  //  private/published/linkedout/reported
  if(!modalType){
    return null
  }
  return (
    <GeneralModal isOpen={isOpen} isBackgroundVisible={true}>
      <ChildrenDiv>
        <ImgDiv>{mapper[modalType].img}</ImgDiv>
        <ContentsDiv>
          <TitleDiv>{mapper[modalType].title}</TitleDiv>
          <DescDiv>
            <P>{mapper[modalType].desc}</P>
          </DescDiv>
        </ContentsDiv>
        <BtnDiv>
          <Button text="닫기" style="square" type="point" scale="small" onClick={handleModalOpen} />
        </BtnDiv>
      </ChildrenDiv>
    </GeneralModal>
  );
}

export default CompleteModal;
