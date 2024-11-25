import React, { useState } from "react";
import SpotMenuIcon from "@/shared/assets/img/spotmenuicon.svg";
import styled, { css } from "styled-components";
import color from "@/shared/styles/color";
import { Essay } from "@/shared/types";
import { formatDateFullString } from "@/shared/lib/date";
import { useRouter } from "next/navigation";
import { BlackMiniModal } from "@/shared/ui/modal";
import EditIcon from "@/shared/assets/img/modal_icon/pen.svg";
import DeleteIcon from "@/shared/assets/img/modal_icon/delete.svg";
import DeleteModal from "@/shared/ui/modal/DeleteModal";

const Layout = styled.article<{ img?: string }>`
  width: 657px;
  height: 141px;
  padding: 20.54px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10.27px;
  flex-shrink: 0;
  align-self: stretch;
  border-bottom: 1.027px solid rgba(104, 104, 104, 0.1);
  background: ${({ img }) =>
    img
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`
      : "none"};
  margin: 0 auto;
  cursor: pointer;
`;
const H1 = styled.h1`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SpotIconDiv = styled.div`
  z-index: 100;
  position: relative;
`;
const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const DescDiv = styled.div`
  width: 100%;
  height: 82px;
  color: ${color.white};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 23.8px */
  letter-spacing: 0.14px;
  margin-top: 15.72px;
`;
const TimeDiv = styled.div`
  width: 100%;
  height: 17px;
  color: #686868;
  text-align: right;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
`;
const Chip = styled.div`
  color: ${color.black};
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  width: 40px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${color.pointcolor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalItem = styled.button<{ isdelete: boolean; islast?: boolean }>`
  all: unset;
  padding: 12px 10px;
  display: flex;
  justify-content: space-between;
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
const IconDiv = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  margin-right: 15px;
  svg {
    cursor: pointer;
  }
`;
function Card({
  data,
  type,
  handleEssayDelete,
}: {
  data: Essay;
  type: string;
  handleEssayDelete: (id: number) => void;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigateToDetails = () => {
    router.push(`essay_details?id=${data.id}&pageType=${type}`);
  };
  const navigateToEditor = () => {
    router.push(
      `/web/write_essay?pageType=${type}&editorType=edit&essayId=${data.id}`
    );
  };
  const onCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleEssayDeleteWithId={handleEssayDelete}
        id={data.id}
      />
      <Layout img={data.thumbnail}>
        <TitleDiv onClick={navigateToDetails}>
          <H1>
            {data.title} {type == "public" && <Chip>Out</Chip>}
          </H1>
          <SpotIconDiv onClick={(e) => onCloseModal(e)}>
            {isModalOpen && (
              <BlackMiniModal
                isabsolute={true}
                top="30px"
                right="10px"
                isNoneActiveOutside={true}
              >
                <ModalItem isdelete={false} onClick={navigateToEditor}>
                  <span>수정</span>
                  <IconDiv>
                    <EditIcon />
                  </IconDiv>
                </ModalItem>
                <ModalItem
                  isdelete={true}
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsDeleteModalOpen(!isDeleteModalOpen);
                  }}
                  islast={true}
                >
                  <span>삭제</span>
                  <IconDiv>
                    <DeleteIcon />
                  </IconDiv>
                </ModalItem>
              </BlackMiniModal>
            )}
            <SpotMenuIcon />
          </SpotIconDiv>
        </TitleDiv>
        <DescDiv onClick={navigateToDetails}>{data.content}...</DescDiv>
        <TimeDiv onClick={navigateToDetails}>
          {formatDateFullString(data?.createdDate)}
        </TimeDiv>
      </Layout>
    </>
  );
}

export default Card;
