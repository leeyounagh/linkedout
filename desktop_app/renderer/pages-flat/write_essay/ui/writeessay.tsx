import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import TitleField from "./contents/TitleField";
import BottomField from "./contents/BottomField";
import { fetchData } from "@/shared/api/fetchData";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { RoundConfirm } from "@/shared/ui/modal";
import FinishedEssay from "./finishedessaycontents/FinishedEssay";
import { base64ToFile } from "../lib/parsingbase64";
import { useSearchParams } from "next/navigation";

const Editor = dynamic(
  () => import("@/shared/ui/editor").then((mod) => mod.Editor),
  { ssr: false }
);

const Layout = styled.main`
  margin-top: 32px;
  width: 100vw;
`;
const EditorContainer = styled.div<{ isBottomFieldVisible: boolean }>`
  height: ${({ isBottomFieldVisible }) =>
    isBottomFieldVisible ? "326px" : "auto"};
  transition: height 0.3s ease-in-out;
  .ql-container {
    height: ${({ isBottomFieldVisible }) =>
      isBottomFieldVisible ? "326px" : "auto"};
    display: flex;
    flex-direction: column;
  }

  .ql-editor {
    flex-grow: 1;
    overflow-y: auto;
  }
`;
interface BottomValue {
  active: "tag" | "location";
  tag: {
    values: string[];
  };
  location: {
    values: string[];
  };
}

export interface Essay {
  id: string;
  title: string;
  timestamp: string;
  checked: boolean;
}
const defaultId = uuidv4();
export const WriteEssay = () => {
  const router = useRouter();
  const [title, setTitle] = useState("제목 없음");
  const [value, setValue] = useState<string>("");
  const [bottomValue, setBottomValue] = useState<BottomValue>({
    active: "tag",
    tag: {
      values: [],
    },
    location: {
      values: [],
    },
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [id, setId] = useState<string>(defaultId);
  const [isCancel, setIsCancel] = useState(false);
  const [step, setStep] = useState("write");
  const currentId = localStorage.getItem("currentEssayId");
  const isBottomFieldVisible =
    bottomValue.active === "tag" || bottomValue.active === "location";
  const searchParams = useSearchParams();
  const pageType = searchParams.get("pageType");
  const essayId = searchParams.get("essayId");
  const editorType = searchParams.get("editorType");

  console.log("test",pageType,essayId,editorType)

  useEffect(() => {
    const processEssayData = (id: string) => {
      const storedData = JSON.parse(localStorage.getItem("essayData") || "[]");
      const entry = storedData.find((item: Essay) => item.id === id);
      if (entry) {
        setTitle(entry.title);
        setValue(entry.value);
        setBottomValue(entry.bottomValue);
        setImageSrc(entry.imageSrc);
      }
    };
    if (currentId) {
      processEssayData(currentId);
      localStorage.setItem("currentEssayId", currentId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const currentId = localStorage.getItem("currentEssayId");
      const essayData = JSON.parse(localStorage.getItem("essayData") || "[]");

      const existingEssayIndex = essayData.findIndex(
        (item: any) => item.id === id
      );
      if (!currentId) {
        if (existingEssayIndex > -1) {
          const newId = uuidv4();
          essayData[existingEssayIndex].id = newId;
          localStorage.setItem("essayData", JSON.stringify(essayData));
        } else {
          localStorage.setItem("currentEssayId", id);
        }
      }
    }
  }, [id, step]);

  useEffect(() => {
    saveToLocalStorage();
    const interval = setInterval(saveToLocalStorage, 30000);
    return () => clearInterval(interval);
  }, [title, value, bottomValue]);

  const saveToLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem("essayData") || "[]");
    const id = localStorage.getItem("currentEssayId");
    const existingEntryIndex = storedData.findIndex(
      (item: any) => item.id === id
    );

    const existingImageSrc =
      existingEntryIndex > -1 && storedData[existingEntryIndex].imageSrc
        ? storedData[existingEntryIndex].imageSrc
        : "";

    const newData = {
      id,
      title,
      value,
      bottomValue,
      imageSrc: existingImageSrc,
      timestamp: new Date().toISOString(),
    };

    if (existingEntryIndex > -1) {
      storedData[existingEntryIndex] = { ...newData };
    } else {
      storedData.push(newData);
    }

    localStorage.setItem("essayData", JSON.stringify(storedData));
  };

  const handlecancle = () => {
    const storedData = JSON.parse(localStorage.getItem("essayData") || "[]");
    let deleteSaveData = storedData.filter(
      (item: Essay) => item.id !== currentId
    );
    localStorage.setItem("essayData", JSON.stringify(deleteSaveData));
    localStorage.setItem("currentEssayId", "");
    if (step === "finish") {
      setIsCancel(!isCancel);
      setStep("write");
      setTitle("제목 없음");
      setValue("");
    } else {
      router.push("/web/main");
    }
  };

  const handleSave = () => {
    localStorage.setItem("currentEssayId", "");
    router.push("/web/main");
  };

  const handlenavigateBack = () => {
    if (step === "write") {
      setIsCancel(!isCancel);
    } else {
      setStep("write");
    }
  };

  const handleStep = () => {
    if (step === "write") {
      setStep("finish");
    }
    if (step === "finish") {
      setIsCancel(!isCancel);
      // setStep("write");
    }
  };
  const renderEditor = () => (
    <>
      <EditorContainer isBottomFieldVisible={isBottomFieldVisible}>
        <Editor
          value={value}
          setValue={setValue}
          tagValue={bottomValue}
          setTagValue={setBottomValue}
        />
      </EditorContainer>
      {isBottomFieldVisible && (
        <BottomField
          bottomValue={bottomValue}
          setBottomValue={setBottomValue}
        />
      )}
    </>
  );

  const renderFinishedEssay = () => (
    <FinishedEssay
      title={title}
      desc={value}
      tag={bottomValue?.tag.values}
      location={bottomValue?.location.values}
      imageFile={imageSrc ? base64ToFile(imageSrc, "thumbnail image") : null}
    />
  );

  return (
    <Layout>
      {isCancel &&
        (step === "write" ? (
          <RoundConfirm
            title="지금 취소하면 모든 내용이 삭제됩니다."
            firstText="작성취소후 메인으로 가기"
            secondText="임시저장후 메인으로 가기"
            text="취소"
            onFirstFunc={handlecancle}
            onSecondFunc={handleSave}
            onThirdFunc={handlenavigateBack}
          />
        ) : step === "finish" ? (
          <RoundConfirm
            title={
              <>
                삭제된 글은 복구할 수 없습니다. <br />
                삭제하시겠습니까?
              </>
            }
            firstText="삭제하기"
            secondText="취소"
            onFirstFunc={handlecancle}
            onSecondFunc={() => {
              setIsCancel(!isCancel);
            }}
            right="30px"
          />
        ) : null)}
      <TitleField
        title={title}
        setTitle={setTitle}
        handlenavigateBack={handlenavigateBack}
        step={step}
        handleStep={handleStep}
        setStep={setStep}
      />
      {/* 본문 에디터 또는 완성된 글 */}
      {step === "write" ? renderEditor() : renderFinishedEssay()}
    </Layout>
  );
};
