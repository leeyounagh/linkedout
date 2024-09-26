import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import ReactQuill, { Quill } from "react-quill";
import styled from "styled-components";
import SelectText from "./SelectText";
import CustomToolBar from "./CustomToolbar";
import Image from "next/image";
import color from "@/shared/styles/color";
import { GeneralToast } from "../toast";
import { MiniToast } from "../toast";

const EditorDiv = styled.div`
  position: relative;

  .ql-snow .ql-editor strong {
    font-weight: bold !important;
  }
  .ql-toolbar {
    background: #1d1d1d !important;
    border: none;
  }
  .ql-bold::before,
  .ql-underline::before,
  .ql-strike::before {
    content: none;
  }

  .ql-editor {
    padding: 72px 147px;
    overflow-y: auto;
  }

  .ql-editor.ql-blank::before {
    color: #686868;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 170%;
    padding: 0 147px;
  }

  .ql-container.ql-snow {
    border: none !important;
  }
`;
const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 147px;
  position: relative;
`;
const ThumbnailEditBtn = styled.button`
  width: 57px;
  height: 32px;
  border: none;
  background: none;
  padding: 0;
  outline: none;
  box-shadow: none;
  position: absolute;
  top: 35px;
  right: 13%;
  z-index: 1;
  background-color: ${color.pointcolor};
  color: ${color.white};
  cursor: pointer;
`;

const sizeMap = {
  small: "10px",
  default: "13px",
  large: "18px",
  huge: "32px",
};

const SizeStyle = Quill.import("attributors/style/size");
SizeStyle.whitelist = Object.values(sizeMap);
Quill.register(SizeStyle, true);
interface TagValue {
  active: any;
  tag: {
    values: string[];
  };
  location: {
    values: string[];
  };
}

function Editor({
  value,
  setValue,
  tagValue,
  setTagValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  tagValue: TagValue;
  setTagValue: Dispatch<SetStateAction<TagValue>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);
  const [editorWidth, setEditorWidth] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);

  useEffect(() => {
    const currentEssayId = localStorage.getItem("currentEssayId");
    if (currentEssayId) {
      const essayData = JSON.parse(localStorage.getItem("essayData") || "[]");
      const storedEssayData = essayData.find((item: any) => {
        return item.id === currentEssayId && item.imageSrc;
      });
      if (storedEssayData?.imageSrc) {
        setThumbnailImage(storedEssayData.imageSrc);
      }
    }
  }, []);

  useEffect(() => {
    const updateEditorWidth = () => {
      if (quillRef.current) {
        const editorContainer = quillRef.current.getEditor().root;
        setEditorWidth(editorContainer.clientWidth);
      }
    };

    updateEditorWidth();

    window.addEventListener("resize", updateEditorWidth);

    return () => {
      window.removeEventListener("resize", updateEditorWidth);
    };
  }, []);

  const handleSave = () => {
    // 현재 로직상 타이핑을 칠때마다 저장되고 있지만, 사용자에게 저장되었음을 나타내주기 위하여 알림 토스트 세팅
    setIsMiniModalOpen(true);

    setTimeout(() => {
      setIsMiniModalOpen(false);
    }, 3000);
  };

  const applyFontSize = (size: keyof typeof sizeMap) => {
    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      if (quillEditor) {
        quillEditor.format("size", sizeMap[size]);
      }
    }
  };
  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      convertFileToBase64(file, (base64Url: string) => {
        setThumbnailImage(base64Url);
        insertImageIntoEditor(base64Url);
      });
    }
  };
  const convertFileToBase64 = (
    file: File,
    callback: (base64Url: string) => void
  ) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      callback(base64Url);
      const currentEssayId = localStorage.getItem("currentEssayId");

      if (currentEssayId) {
        const essayData = JSON.parse(localStorage.getItem("essayData") || "[]");

        const updatedEssayData = essayData.map((essay: any) => {
          if (essay.id === currentEssayId) {
            return { ...essay, imageSrc: base64Url };
          }
          return essay;
        });
        localStorage.setItem("essayData", JSON.stringify(updatedEssayData));
      }
    };
  };
  const insertImageIntoEditor = (base64Url: string) => {
    setThumbnailImage(base64Url);
  };

  const handleCustomFontSizeClick = () => {
    setIsModalOpen(true);
  };
  const handleBoldClick = () => {
    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      quillEditor.format("bold", !quillEditor.getFormat().bold);
      setIsModalOpen(false);
    }
  };

  const handleUnderlineClick = () => {
    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      quillEditor.format("underline", !quillEditor.getFormat().underline);
      setIsModalOpen(false);
    }
  };

  const handleStrikeClick = () => {
    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      quillEditor.format("strike", !quillEditor.getFormat().strike);
      setIsModalOpen(false);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          customFontSize: handleCustomFontSizeClick,
          "custom-bold": handleBoldClick,
          "custom-underline": handleUnderlineClick,
          "custom-strike": handleStrikeClick,
          "custom-image": handleImageUploadClick,
        },
      },
    }),
    []
  );
  const formats = useMemo(() => ["bold", "underline", "strike", "size"], []);

  useEffect(() => {
    const quillEditor = quillRef.current?.getEditor();
    if (quillEditor) {
      const toolbar = quillEditor.getModule("toolbar");

      const handleToolbarClick = (event: Event) => {
        const target = event.target as HTMLElement;
        if (
          target.classList.contains("ql-custom-bold") ||
          target.classList.contains("ql-custom-underline") ||
          target.classList.contains("ql-custom-strike")
        ) {
          setIsModalOpen(false);
        }
      };

      toolbar.container.addEventListener("click", handleToolbarClick);

      return () => {
        toolbar.container.removeEventListener("click", handleToolbarClick);
      };
    }
  }, []);

  const sizeOptions: Array<"small" | "default" | "large" | "huge"> = [
    "small",
    "default",
    "large",
    "huge",
  ];

  const tagHandler = (name: string) => {
    setTagValue((prevState: TagValue) => ({
      ...prevState,
      active: prevState.active === name ? "" : name,
    }));
  };
  return (
    <EditorDiv>
      <MiniToast
        isShowToast={isMiniModalOpen}
        setIsShowToast={setIsMiniModalOpen}
        title="임시 저장이 완료되었습니다."
      />
      <GeneralToast
        title="저장이 완료되었습니다."
        isShowToast={isShowModal}
        setIsShowToast={setIsModalOpen}
      />
      <CustomToolBar
        isModalOpen={isModalOpen}
        tagName={tagValue.active}
        tagHandler={tagHandler}
        handleSave={handleSave}
      />
      {thumbnailImage && (
        <ThumbnailContainer>
          <ThumbnailEditBtn onClick={handleImageUploadClick}>
            변경
          </ThumbnailEditBtn>
          <Image
            src={thumbnailImage}
            alt="Thumbnail"
            width={editorWidth}
            height={460}
          />
        </ThumbnailContainer>
      )}
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        placeholder="내용을 입력하세요"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {isModalOpen && (
        <SelectText option={sizeOptions} applyFontSize={applyFontSize} />
      )}
    </EditorDiv>
  );
}

export default Editor;
