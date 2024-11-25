import React from "react";
import styled from "styled-components";
import { Button } from "@/shared/ui/button";
import { useStore } from "@/shared/store";
import { CircularAvatar } from "@/shared/ui/avatar";
import DefaultProfileImg from "@/shared/assets/img/default_profile.webp";
import color from "@/shared/styles/color";

const Layout = styled.div`
  position: absolute;
  top: 120.97px;
  width: 90%;
  height: 326px;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 63.48%;
  height: 100%;
`;
const ProfileImageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Span = styled.span`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  strong {
    color: ${color.pointcolor};
  }
`;
const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top:16px;
`;
const OverviewDiv = styled.div`
  width: 100%;
  height: 98px;
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top:21px;
`;
const StatisticsItemDiv = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const GreyText = styled.span`
  color: #616161;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;
const GreyBigText = styled.span`
  color: #616161;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

function Header() {
  const user = useStore((state) => state.user);
  return (
    <Layout>
      <Wrapper>
        <ProfileImageDiv>
          <ProfileImageWrapper>
            <CircularAvatar
              img={user?.profileImage || DefaultProfileImg.src}
              width={60}
              height={60}
            />
            <Span>
              <strong>{user?.nickname}</strong> 아무개
            </Span>
          </ProfileImageWrapper>
        </ProfileImageDiv>
        <OverviewDiv>
          <StatisticsItemDiv>
            <GreyText>쓴글</GreyText>
            <GreyBigText>38</GreyBigText>
          </StatisticsItemDiv>
          <StatisticsItemDiv>
            <GreyText>발행</GreyText>
            <GreyBigText>24</GreyBigText>
          </StatisticsItemDiv>
          <StatisticsItemDiv>
            <GreyText>링크드아웃</GreyText>
            <GreyBigText>7</GreyBigText>
          </StatisticsItemDiv>
        </OverviewDiv>
        <BtnDiv>
          <Button text="프로필 편집" />
        </BtnDiv>
      </Wrapper>
    </Layout>
  );
}

export default Header;
