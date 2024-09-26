import React, { useState, useEffect } from "react";
import TitleField from "./contents/TitleField";
import styled from "styled-components";
import ContentLayout from "./contentlayout/ContentLayout";
import Card from "./contents/Card";
import ContentsInformation from "./contents/ContentsInformation";
import BottomDialog from "./bottomdialog/BottomDialog";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const LayoutContatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-right: 1px solid rgba(104, 104, 104, 0.1);
  border-left: 1px solid rgba(104, 104, 104, 0.1);
`;
export interface Essay {
  id: string;
  title: string;
  timestamp: string;
  checked: boolean;
}
function UnfinishedWriting() {
  const [essayData, setEssayData] = useState<Essay[] | null>(null);
  const [currentEssay, setCurrentEssay] = useState<Essay | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isCheckDelete, setIsCheckDelete] = useState(false);


  useEffect(() => {
    const storedEssayData = JSON.parse(
      localStorage.getItem("essayData") || "[]"
    );
    const currentEssayId = localStorage.getItem("currentEssayId");
    if (storedEssayData) {
      const currentData = storedEssayData.find(
        (item: any) => item.id === currentEssayId
      );
      setCurrentEssay(currentData);
      const prevData = storedEssayData
        .filter((item: Essay) => item.id !== currentEssayId)
        .map((item: Essay) => ({
          ...item,
          isChecked: false,
        }));
      setEssayData(prevData);
    }
  }, []);

  const handleCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newChecked = e.target.checked;
    setEssayData((prev) =>
      prev
        ? prev.map((item) =>
            item.id === id ? { ...item, checked: newChecked } : item
          )
        : null
    );
  };
  const handleCheckAll = () => {
    setEssayData((prev) =>
      prev ? prev.map((item) => ({ ...item, checked: true })) : null
    );
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    const updatedEssayData = essayData?.filter((item) => !item.checked) || [];
    setEssayData(updatedEssayData);
    localStorage.setItem("essayData", JSON.stringify(updatedEssayData));
  };
  const handleDeleteCancle = () => {
    setIsCheckDelete(false);
    setIsEdit(false);
  };

  const handleCheckDelete = () => {
    setIsEdit(false);
    setIsCheckDelete(true);
  };

  const countCheckedItems = () => {
    const checkedItems = essayData?.filter((item) => item.checked) || [];

    return checkedItems.length;
  };

  const numberOfCheckedItems = countCheckedItems();

  return (
    <Container>
      <TitleField handleEdit={handleEdit} isEdit={isEdit} />
      <LayoutContatiner>
        <LayoutWrapper>
          <Card
            title={currentEssay?.title ?? "제목 없음"}
            date={currentEssay?.timestamp ?? "날짜 없음"}
            isCurrent={true}
            id={currentEssay?.id ?? ""}
          />
          {isEdit && (
            <ContentsInformation
              totalLength={essayData ? essayData.length : 0}
              handleCheckAll={handleCheckAll}
            />
          )}

          <ContentLayout>
            {essayData?.map((item) => (
              <Card
                id={item.id}
                key={item.title}
                title={item.title}
                date={item.timestamp}
                isCurrent={false}
                isChecked={item.checked}
                handleCheckChange={handleCheckChange}
                isEdit={isEdit}
              />
            ))}
          </ContentLayout>
        </LayoutWrapper>
      </LayoutContatiner>
      <BottomDialog
        isEdit={isEdit}
        onDelete={handleDelete}
        onCancel={handleDeleteCancle}
        isCheckDelete={isCheckDelete}
        handleCheckDelete={handleCheckDelete}
        numberOfCheckedItems={numberOfCheckedItems}
      />
    </Container>
  );
}

export default UnfinishedWriting;
