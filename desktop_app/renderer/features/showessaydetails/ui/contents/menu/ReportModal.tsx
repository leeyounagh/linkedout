import React, { useEffect, useState } from "react";
import { BottomSheet } from "@/shared/ui/modal";
import styled from "styled-components";
import Check from "@/shared/ui/check/check";
import { Button } from "@/shared/ui/button";
import color from "@/shared/styles/color";
import { useRouter } from "next/navigation";
import ReportCompleted from "./ReportCompleted";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 88px;
  padding-top: 51px;
`;
const Title = styled.h1`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
const Desc = styled.p`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 170%; /* 23.8px */
  letter-spacing: 0.14px;
`;
const Span = styled.span`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 30.6px */
  letter-spacing: 0.18px;
`;

const CheckboxItemDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 20px;
  height: 54px;
  border-bottom: 1px solid #202020;
`;
const BtnDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  position: fixed;
  bottom: 0;
`;
const TextArea = styled.textarea`
  border: none;
  outline: none;
  width: 639px;
  height: 167px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #616fed;
  background-color: ${color.lightBlack};
  color: ${color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 27.2px */
  letter-spacing: 0.16px;
  padding: 17px 18px;
  resize: none;
`;
const TextAreaDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const CheckboxContainer = styled.div`
  width: 100%;
  height: 450px;
  overflow-y: auto;
`;

function ReportModal({
  onClose,
  isShowModal,
  submitReport,
}: {
  onClose: () => void;
  isShowModal: boolean;
  submitReport: (reason: string) => any;
}) {
  const [reportData, setReportData] = useState([
    {
      title: "스팸/도배글",
      checked: false,
    },
    {
      title: "음란물",
      checked: false,
    },
    {
      title: "욕설/혐오 표현 또는 상징",
      checked: false,
    },
    {
      title: "거짓 정보",
      checked: false,
    },
    {
      title: "청소년에게 유해한 내용",
      checked: false,
    },
    {
      title: "불쾌한 표현",
      checked: false,
    },
    {
      title: "불법 정보",
      checked: false,
    },
    {
      title: "지식재산권 침해",
      checked: false,
    },
    {
      title: "개인 정보 노출",
      checked: false,
    },
    {
      title: "기타 문제",
      checked: false,
    },
  ]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [etcChecked, setEtcChecked] = useState(false);
  const [etcText, setEtcText] = useState("");
  const [btnText, setBtnText] = useState("신고하기");

  useEffect(() => {
    const isChecked = reportData.some((value) => value.checked === true);
    setIsBtnDisabled(!isChecked);
  }, [reportData]);

  const handleIndividualCheck = (key: string) => {
    if (key === "기타 문제") {
      setEtcChecked(!etcChecked);
    }
    setReportData((prev) =>
      prev.map((item) =>
        item.title === key
          ? { ...item, checked: !item.checked }
          : { ...item, checked: false }
      )
    );
  };
  const reportHandler = async () => {
    const reason = reportData.filter((item) => item.checked === true)[0];
    let reasonDesc = reason.title.includes("기타") ? etcText : reason.title;

    if (btnText.includes("신고하기")) {
      const status = await submitReport(reasonDesc);
      if (status === 201) {
        setBtnText("확인");
      }
    } else {
      onClose();
    }
  };
  const reportRenderer = () => {
    const isComplete = !btnText.includes("신고하기");
    return (
      <>
        {isComplete ? (
          <ReportCompleted />
        ) : (
          <>
            <TitleDiv>
              <Title>신고</Title>
              <Desc>이 글을 신고하는 이유를 선택해주세요.</Desc>
            </TitleDiv>

            {etcChecked ? (
              <CheckboxContainer>
                <CheckboxItemDiv
                  onClick={() => handleIndividualCheck("기타 문제")}
                >
                  <Check
                    check={reportData[reportData.length - 1].checked}
                    type="circle"
                    setCheck={() => {}}
                  />
                  <Span>{reportData[reportData.length - 1].title}</Span>
                </CheckboxItemDiv>
                <TextAreaDiv>
                  <TextArea
                    value={etcText}
                    onChange={(e) => {
                      setEtcText(e.target.value);
                    }}
                  ></TextArea>
                </TextAreaDiv>
              </CheckboxContainer>
            ) : (
              <CheckboxContainer>
                {reportData.map((data) => {
                  return (
                    <CheckboxItemDiv
                      key={data.title}
                      onClick={() => handleIndividualCheck(data.title)}
                    >
                      <Check
                        check={data.checked}
                        type="circle"
                        setCheck={() => {}}
                      />
                      <Span>{data.title}</Span>
                    </CheckboxItemDiv>
                  );
                })}
              </CheckboxContainer>
            )}
          </>
        )}
      </>
    );
  };
  return (
    <BackgroundContainer>
      <BottomSheet
        isOpen={isShowModal}
        size="max"
        isCloseModified={true}
        onClose={onClose}
      >
        {reportRenderer()}
        <BtnDiv>
          <Button
            text={btnText}
            type={isBtnDisabled ? "disable" : "point"}
            onClick={reportHandler}
          ></Button>
        </BtnDiv>
      </BottomSheet>
    </BackgroundContainer>
  );
}

export default ReportModal;
