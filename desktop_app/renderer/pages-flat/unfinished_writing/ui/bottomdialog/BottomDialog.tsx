import React from "react";
import { BottomSeet } from "@/shared/ui/modal";
import { Button } from "@/shared/ui/button";
import styled from "styled-components";
import { Confirm } from "@/shared/ui/modal";

const ButtonDiv = styled.div`
  position: fixed;
  bottom: 86px;
  left: 35%;
`;

function BottomDialog({
  isEdit,
  onDelete,
  onCancel,
  isCheckDelete,
  handleCheckDelete,
  numberOfCheckedItems,
}: {
  isEdit: boolean;
  onDelete: () => void;
  onCancel: () => void;
  isCheckDelete: boolean;
  handleCheckDelete: () => void;
  numberOfCheckedItems: number;
}) {
  // disable일때 아닐때, confirm창나올때
  return (
    <>
      {isEdit && (
        <ButtonDiv>
          <Button
            text={`총 ${numberOfCheckedItems}개 삭제`}
            type={numberOfCheckedItems === 0 ? "disable" : "point"}
            style="square"
            scale="large"
            onClick={() => {
              if (numberOfCheckedItems > 0) {
                handleCheckDelete();
              }
            }}
          />
        </ButtonDiv>
      )}
      {isCheckDelete && (
        <Confirm
          title1="임시 저장 글이 사라집니다. "
          title2="삭제하시겠습니까?"
          onDelete={onDelete}
          onCancel={onCancel}
        />
      )}
    </>
  );
}

export default BottomDialog;
