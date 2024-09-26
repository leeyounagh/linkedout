import React from "react";
import styled from "styled-components";
import color from "@/shared/styles/color";
import { Button } from "@/shared/ui/button";
import { formatDateToKorean } from "@/shared/lib/date";

const TitleText = styled.h1`
  color: ${color.pointcolor};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  position: absolute;
  top: 180px;
  left: 115px;
  width: 230px;
`;

const DescDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 280px;
  position: absolute;
  top: 250px;
  left: 85px;
`;

const P = styled.p`
  color: #929292;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const Strong = styled.strong`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const ButtonDiv = styled.div`
  position: absolute;
  top: 360px;
  left: 80px;
`;

function UserSupportTextField({
  createdDate,
  handleCloseModal
}: {
  createdDate: string;
  handleCloseModal?:() =>void;
}) {
  return (
    <>
      <TitleText>{formatDateToKorean(createdDate)}에 신고하신 게시물이 비공개 처리되었습니다.</TitleText>
      <DescDiv>
        <P>
          해당 글은 검토 결과
          <Strong>
            커뮤니티 가이드라인을 위반하는 콘텐츠를 포함하고 있어 비공개 처리
          </Strong>
          되었습니다. 신고해주셔서 감사합니다!
        </P>
      </DescDiv>
      <ButtonDiv>
        <Button text="확인" style="square" scale="small" type="point" onClick={handleCloseModal}/>
      </ButtonDiv>
    </>
  );
}

export default UserSupportTextField;
