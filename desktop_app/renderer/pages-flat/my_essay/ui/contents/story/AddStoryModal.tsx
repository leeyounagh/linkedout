import React, { useEffect, useState } from "react";
import PrevButtonImg from "@/shared/assets/img/prevbutton.svg";
import styled from "styled-components";
import color from "@/shared/styles/color";
import SpotMenuIcon from "@/shared/assets/img/spotmenuicon.svg";
import Check from "@/shared/ui/check/check";
import { Button } from "@/shared/ui/button";
import SuccessStory from "./SuccessStory";
import { getStoryEssayList } from "@/shared/api";
import { formatDateString } from "@/shared/lib/date";
import { postStory } from "@/shared/api";
import { BlackMiniModal } from "@/shared/ui/modal";
import { putStory } from "@/shared/api";
import { deleteStory } from "@/shared/api";
import { getUserEssays, getStoryDetails } from "@/shared/api";

const Layout = styled.article`
  display: flex;
  flex-direction: column;

  .menu {
    margin-right: 30px;
  }
`;

const PrevBtn = styled.button`
  width: 24px;
  height: 20.5px;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 30px;
  &:focus {
    outline: none;
  }
`;
const Header = styled.header`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(104, 104, 104, 0.3);
  background: #121212;
  display: flex;
  margin-top: 32px;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
  }
`;
const Title = styled.h1`
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  width: 95%;
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
`;
const Input = styled.input`
  all: unset;
  display: flex;
  width: 900px;
  padding: 46px 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background: #161616;
`;
const ContentsBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ContentsInfo = styled.div`
  display: flex;
  width: 900px;
  padding: 15px 40px;
  align-items: center;
  justify-content: space-between;
  gap: 689px;
  border-right: 1px solid rgba(104, 104, 104, 0.1);
  border-left: 1px solid rgba(104, 104, 104, 0.1);
  border-bottom: 1px solid rgba(104, 104, 104, 0.1);
`;

const Span = styled.span`
  color: #727070;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const Strong = styled.strong`
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const BlackButton = styled.button`
  all: unset;
  border-radius: 4px;
  background: #161616;
  display: flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${color.pointcolor};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;
`;

const ListCard = styled.div`
  border-right: 1px solid rgba(104, 104, 104, 0.1);
  border-left: 1px solid rgba(104, 104, 104, 0.1);
  border-bottom: 1px solid rgba(104, 104, 104, 0.1);
  display: flex;
  width: 900px;
  padding: 24px 40px;
  justify-content: space-between;
  gap: 10px;
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const P = styled.p`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const Time = styled.time`
  color: #727070;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const BtnDiv = styled.div`
  position: fixed;
  bottom: 60px;
`;
const CheckDiv = styled.div`
  display: flex;
  align-items: center;
`;
const CountText = styled.p`
  color: #6b6b6b;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const Chip = styled.div`
  display: inline-flex;
  height: 20px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${color.pointcolor};
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const ModalItem = styled.button<{ isdelete: boolean; islast?: boolean }>`
  all: unset;
  padding: 12px 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${({ isdelete }) => (isdelete ? "red" : color.white)};
  align-items: center;
  border-bottom: ${({ islast }) => (islast ? "none" : "1px solid #1a1a1a")};
  cursor: pointer;
  span {
    width: 100px;
    margin-left: 5px;
  }
`;
const SpotMenuIconDiv = styled.div`
  position: fixed;
  right: 0px;
  top: 45px;
`;

function AddStoryModal({
  handleStoryModal,
  selectedStoryId,
  setStoryId,
  storedStoryName,
  setStoredStoryName,
  toastHandler,
  isSuccess,
  setIsSuccess,
}: {
  handleStoryModal: (id?: number) => void;
  selectedStoryId: number | null;
  setStoryId: React.Dispatch<React.SetStateAction<number | null>>;
  storedStoryName: string;
  setStoredStoryName: React.Dispatch<React.SetStateAction<string>>;
  toastHandler: (text: string, isError: boolean) => void;
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [essay, setEssay] = useState<any[]>([]);
  const [checkedCount, setCheckedCount] = useState(0);
  const [title, setTitle] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const count = essay.filter((item) => item.isChecked).length;
    setCheckedCount(count);
  }, [essay]);

  useEffect(() => {
    if (selectedStoryId) {
      updateEssayList();
    } else {
      essayList();
    }
  }, [selectedStoryId, isSuccess]);

  const essayList = async () => {
    try {
      const { data } = await getStoryEssayList();
      const updatedData = data.map((item: any) => ({
        ...item,
        isChecked: false,
      }));
      setEssay(updatedData);
    } catch (err) {
      console.log(err);
    }
  };
  const updateEssayList = async () => {
    try {
      if (selectedStoryId && !isSuccess) {
        const { data } = await getStoryEssayList(selectedStoryId);
        const updatedData = data.map((item: any) => ({
          ...item,
          isChecked: item.story === selectedStoryId ? true : false,
        }));
        setTitle(storedStoryName);
        setEssay([...updatedData]);
      } else if (selectedStoryId && isSuccess) {
        const { data,currentStoryName } = await getStoryDetails(selectedStoryId);
        setEssay(data);
        setTitle(currentStoryName);
      }
    } catch (Err) {
      console.log(Err);
    }
  };
  const toggleCheck = (index: number) => {
    setEssay((prevEssay) =>
      prevEssay.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  const selectAll = () => {
    setEssay((prevEssay) =>
      prevEssay.map((item) => ({ ...item, isChecked: !item.isChecked }))
    );
  };
  const updateStory = async () => {
    // 스토리 id가 선택되었을때 안되었을때 나눠서 api요청
    if (title.length === 0) {
      toastHandler("스토리 이름을 적어주세요.", true);
    }
    try {
      if (selectedStoryId) {
        const { status } = await putStory(selectedStoryId, title, essay);
        if (status === 200) {
          setIsSuccess(true);
        } else {
          // 알럿
          toastHandler(
            "서버와의 연결이 불안정 합니다. 다시 시도해 주세요.",
            true
          );
        }
      } else {
        const { status, data } = await postStory(title, essay);
        if (status === 201) {
          setStoryId(data.id);
          setIsSuccess(true);
        } else {
          // 알럿
          toastHandler(
            "서버와의 연결이 불안정 합니다. 다시 시도해 주세요.",
            true
          );
        }
      }
    } catch (err) {
      toastHandler("서버와의 연결이 불안정 합니다. 다시 시도해 주세요.", true);
      console.log(err);
    }
  };
  // 스토리 등록 api
  const deleteStoryInfo = async () => {
    try {
      if (selectedStoryId) {
        const { status } = await deleteStory(selectedStoryId);
        if (status === 200) {
          toastHandler("삭제되었습니다.", false);
          handleStoryModal();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const titleRenderer = () => {
    let status = isSuccess
      ? "successStory"
      : selectedStoryId
      ? "editStory"
      : "createStory";
    return (
      <>
        <Title>
          {status === "successStory" ? (
            <>
              <Chip>스토리</Chip>
              {title} <CountText>{essay.length}편</CountText>
              <SpotMenuIconDiv>
                <SpotMenuIcon
                  className="menu"
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                />
              </SpotMenuIconDiv>
            </>
          ) : status === "editStory" ? (
            "스토리 수정"
          ) : (
            "스토리 만들기"
          )}
        </Title>
      </>
    );
  };
  return (
    <Layout>
      <Header>
        <PrevBtn
          onClick={() => {
            handleStoryModal();
            setStoryId(null);
            setIsSuccess(false);
          }}
        >
          <PrevButtonImg />
        </PrevBtn>

        {isMenuOpen && (
          <BlackMiniModal top="79px" right="35px">
            <ModalItem
              isdelete={false}
              onClick={() => {
                setIsSuccess(false);
              }}
            >
              스토리 편집
            </ModalItem>
            <ModalItem isdelete={true} islast={true} onClick={deleteStoryInfo}>
              스토리 삭제
            </ModalItem>
          </BlackMiniModal>
        )}

        {titleRenderer()}
      </Header>
      <ContentsBody>
        {isSuccess ? (
          <SuccessStory essay={essay} title={title} />
        ) : (
          <>
            <Input
              placeholder="에세이 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ContentsInfo>
              <Span>
                전체 <Strong>{essay.length}</Strong>개
              </Span>
              <BlackButton onClick={selectAll}>전체 선택</BlackButton>
            </ContentsInfo>
            {essay.map((item, index) => (
              <ListCard key={item.title}>
                <TextDiv>
                  <P>{item.title}</P>
                  <Time>{formatDateString(item.createdDate)}</Time>
                </TextDiv>
                <CheckDiv>
                  <Check
                    check={item.isChecked}
                    setCheck={() => toggleCheck(index)}
                    type="circle"
                  />
                </CheckDiv>
              </ListCard>
            ))}

            <BtnDiv>
              <Button
                text={`총 ${checkedCount}개 모으기`}
                type={checkedCount > 0 ? "point" : "disable"}
                onClick={checkedCount > 0 ? updateStory : undefined}
              />
            </BtnDiv>
          </>
        )}
      </ContentsBody>
    </Layout>
  );
}

export default AddStoryModal;
