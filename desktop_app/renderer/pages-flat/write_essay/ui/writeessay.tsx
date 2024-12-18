import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import TitleField from "./contents/TitleField";
import BottomField from "./contents/BottomField";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { RoundConfirm } from "@/shared/ui/modal";
import FinishedEssay from "./finishedessaycontents/FinishedEssay";
import { base64ToFile } from "../lib/parsingbase64";
import { useSearchParams } from "next/navigation";
import { getEssayDetail } from "@/shared/api";
import { isBase64 } from "../lib/checkBase64";

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
  }'
`;
interface BottomValue {
  active: "tag" | "location" | null;
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
    active: null,
    tag: {
      values: [],
    },
    location: {
      values: [],
    },
  });
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const id = defaultId;
  const isBottomFieldVisible =
    bottomValue.active === "tag" || bottomValue.active === "location";
  const [isCancel, setIsCancel] = useState(false);
  const [step, setStep] = useState("write");
  let currentId = localStorage.getItem("currentEssayId");
  const searchParams = useSearchParams();
  const pageType = searchParams.get("pageType");
  // pageType은 글 수정 기능할때 필요 private인지 public인지 확인 (등록 api할때)
  const essayId = searchParams.get("essayId");
  // 글로키 관련된 params
  const geuloquis = searchParams.get("geuloquis");
  const geuloqueUrl = searchParams.get("url");
  const editorType = searchParams.get("editorType");
  // editorType이 수정인지, 일반글쓰기인지 나타내는 파라미터 editorType이 없다면 일반글쓰기
  const [isTagSave, setIsTagSave] = useState(false);
  const [isLocationSave, setIsLocationSave] = useState(false);
  // 태그가 저장되어있는지 아닌지 확인하는 state isTagSave,isLocationSave

  const getExistEssayDetail = async () => {
    try {
      const { data } = await getEssayDetail(
        pageType || "public",
        Number(essayId) || 0,
        null
      );
      setTitle(data?.essay?.title ?? "");
      setValue(data?.essay?.content ?? "");
      setBottomValue((prev) => ({
        ...prev,
        tag: {
          ...prev.tag,
          values: data?.essay.tags.map((tag) => tag.name) || [],
        },
      }));
      setImageSrc(data?.essay?.thumbnail ?? null);
      localStorage.setItem("tempThumbnail", data?.essay?.thumbnail ?? "");
      if ((data?.essay?.tags ?? []).length > 0) {
        setIsTagSave(true);
      }
      if ((data?.essay?.location ?? "").length > 0) {
        setIsLocationSave(true);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  // useEffect(() => {
  //   // 글로키 전용
  //   if (geuloquis) {
  //     const geuloqueUrl = localStorage.getItem("geuloqueUrl") || "";
  //     const lastFetchDate = localStorage.getItem("lastFetchDate") || "";
  //     const pendignGeuloquis =
  //       localStorage.getItem("pendingGeuloquis") || "false";

  //     if (geuloqueUrl && lastFetchDate && pendignGeuloquis === "false") {
  //       const todayTitle = `${lastFetchDate} GeulRoquis`;
  //       setImageSrc(geuloqueUrl);
  //       setTitle(todayTitle);
  //     } else if (geuloqueUrl && lastFetchDate && pendignGeuloquis === "true") {
  //       setImageSrc(null);
  //     } else {
  //       console.error("localStorage에서 필요한 값이 없습니다.");
  //     }
  //   }
  // }, [geuloquis]);

  useEffect(() => {
    if (editorType !== "edit") {
      if (geuloquis) {
        // 글로키 이용해서 쓰러 왓을때
        const lastFetchDate = localStorage.getItem("lastFetchDate") || "";
        const pendignGeuloquis =
          localStorage.getItem("pendingGeuloquis") || "false";
        if (geuloqueUrl && lastFetchDate) {
          // 글로키 보류인지 아닌지 판별
          if (pendignGeuloquis === "false") {
            const todayTitle = `${lastFetchDate} GeulRoquis`;
            setImageSrc(geuloqueUrl);
            setTitle(todayTitle);
          }
        } else if (
          geuloqueUrl &&
          lastFetchDate &&
          pendignGeuloquis === "true"
        ) {
          setImageSrc(null);
        }
      } else {
        // 일반 글쓰기 모드 일때 기존에 쓰던 글이 있는지 없는지 판별
        const processEssayData = (id: string) => {
          const storedData = JSON.parse(
            localStorage.getItem("essayData") || "[]"
          );
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
      }
    }

    if (editorType === "edit") {
      // 수정모드 일때
      getExistEssayDetail();
    }
    // if (editorType !== "edit" && !geuloquis) {
    //   // 일반 글쓰기 모드 일때
    //   const processEssayData = (id: string) => {
    //     const storedData = JSON.parse(
    //       localStorage.getItem("essayData") || "[]"
    //     );
    //     const entry = storedData.find((item: Essay) => item.id === id);
    //     if (entry) {
    //       setTitle(entry.title);
    //       setValue(entry.value);
    //       setBottomValue(entry.bottomValue);
    //       setImageSrc(entry.imageSrc);
    //     }
    //   };
    //   if (currentId) {
    //     processEssayData(currentId);
    //     localStorage.setItem("currentEssayId", currentId);
    //   }
    // }

    // if (editorType === "edit" && !geuloquis) {
    //   // 수정모드 일때
    //   getExistEssayDetail();
    // }
  }, []);
  useEffect(() => {
    if (editorType !== "edit") {
      // 일반 글쓰기 모드 일때 현재의 에세이 id를 가져와서 기존 저장된 에세이에 해당하는 id가 없으면 내용 추가하는 로직 (자동저장 기능때문에)
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
    }
  }, [id, step]);

  useEffect(() => {
    if (editorType !== "edit") {
      // 일반 글쓰기 모드일때 로컬스트리지에 저장하는 로직
      saveToLocalStorage();
      const interval = setInterval(saveToLocalStorage, 30000);
      return () => clearInterval(interval);
    }
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
        : imageSrc && imageSrc.length > 0
        ? imageSrc
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
    if (editorType !== "edit") {
      let deleteSaveData = storedData.filter(
        (item: Essay) => item.id !== currentId
      );
      localStorage.setItem("essayData", JSON.stringify(deleteSaveData));
    }
    localStorage.setItem("currentEssayId", "");
    localStorage.setItem("tempThumbnail", "");
    if (step === "finish") {
      setIsCancel(!isCancel);
      setStep("write");
      setTitle("제목 없음");
      setValue("");
    } else {
      // localStorage.setItem("geuloqueUrl", "");
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
          editorType={editorType ?? ""}
          geuloqueUrl={geuloqueUrl}
        />
      </EditorContainer>
      {isBottomFieldVisible && (
        <BottomField
          bottomValue={bottomValue}
          setBottomValue={setBottomValue}
          setIsTagSave={setIsTagSave}
          setIsLocationSave={setIsLocationSave}
          isTagSave={isTagSave}
          isLocationSave={isLocationSave}
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
      imageFile={
        isBase64(imageSrc)
          ? base64ToFile(imageSrc, "thumbnail image")
          : imageSrc || null
      }
      essayId={essayId || null}
      editorType={editorType || null}
      pageType={pageType}
      setImageSrc={setImageSrc}
      isTagSave={isTagSave}
      isLocationSave={isLocationSave}
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
        editorType={editorType ?? null}
      />
      {/* 본문 에디터 또는 완성된 글 */}
      {step === "write" ? renderEditor() : renderFinishedEssay()}
    </Layout>
  );
};
