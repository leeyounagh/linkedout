import React, { useState } from "react";
import { BottomSheet } from "@/shared/ui/modal";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { Button } from "@/shared/ui/button";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;
const ModalTextDiv = styled.div`
  height: 48px;
  color: ${color.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-top: 49px;
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  padding-top: 32px;
`;
function DeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleEssayDelete,
  handleEssayDeleteWithId,
  id,
}: {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEssayDelete?: () => void;
  handleEssayDeleteWithId?: (id: number) => void;
  id?: number;
}) {
  const BottomSheetHandler = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  return (
    <>
      {isDeleteModalOpen && (
        <BackgroundContainer>
          <BottomSheet
            isOpen={isDeleteModalOpen}
            size="middle"
            isCloseModified={true}
            onClose={BottomSheetHandler}
          >
            <ModalTextDiv>
              삭제된 글은 복구할 수 없습니다. <br />
              글을 삭제하시겠습니까?
            </ModalTextDiv>
            <BtnDiv>
              <Button text="취소" scale="small" onClick={BottomSheetHandler} />
              <Button
                text="확인"
                scale="small"
                onClick={() => {
                  BottomSheetHandler();
                  if (handleEssayDelete) {
                    handleEssayDelete();
                  }
                  if (handleEssayDeleteWithId && id) {
                    handleEssayDeleteWithId(id)
                  }
                }}
              />
            </BtnDiv>
          </BottomSheet>
        </BackgroundContainer>
      )}
    </>
  );
}

export default DeleteModal;
