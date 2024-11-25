import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LineGraph } from "../../graph";
import { CircularAvatar } from "../../avatar";
import DefaultProfile from "@/shared/assets/img/default_profile.webp";
import color from "@/shared/styles/color";
import { useStore } from "@/shared/store";
import RightArrow from "@/shared/assets/img/menu/right_arrow.svg";
import { getUserSummary } from "../api";
import UserSurpport from "./contents/UserSurpport";
import UpdateHistory from "./contents/UpdateHistory";
import Preference from "./contents/Preference";
import DisplaySettings from "./contents/DisplaySettings";
import DefaultLayout from "./DefaultLayout";
import { useRouter } from "next/navigation";
import Background from "./Background";

const Layout = styled.nav`
  width: 376px;
  height: 100%;
  border-right: 1px solid #191919;
  background: #121212;
  position: fixed;
  top: 32px;
  left: 259px;
  z-index: 190;
`;
const ProfileDiv = styled.div`
  width: 100%;
  height: 98px;
  padding-top: 70px;
  border-bottom: 5px solid #1a1a1a;
`;
const ProfileItemDiv = styled.div`
  display: flex;
  padding-left: 30px;
  align-items: center;
  svg {
    cursor: pointer;
  }
`;
const H1 = styled.h1`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
const Strong = styled.strong`
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const Chip = styled.div`
  width: 60px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 42px;
  background: #191919;
  color: ${color.pointcolor};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  margin-left: 15px;
  margin-right: 82px;
`;
const GreyText = styled.p`
  color: #686868;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  white-space: nowrap;
  margin-right: 10px;
`;
const SmallText = styled.p`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  // line-height: 150%;
  white-space: nowrap;
  margin-left: 20px;
`;
const GeneralText = styled.p`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  // line-height: 150%;
`;
const GraphDiv = styled.div`
  width: 100%;
  height: 194px;
  border-bottom: 5px solid #1a1a1a;
`;
const GraphTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 88px;
  // padding-left: 30px;
  // padding-right: 30px;
  padding-top: 20px;
`;
const StoreDiv = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 5px solid #1a1a1a;
  display: flex;
  align-items: center;
  padding-left: 30px;
  gap: 228px;
`;
const Ul = styled.ul`
  list-style-type: none;
`;
const Li = styled.li`
  color: ${color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  height: 84px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  cursor: pointer;
`;
const LogoutBtn = styled.button`
  all: unset;
  width: 80px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #191919;
  color: #606060;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

function Menu() {
  const user = useStore((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [selectedComponent, setSelectedComponent] =
    useState<JSX.Element | null>(null);
    const router =useRouter()

  const handleCloseComponent = () => {
    setSelectedComponent(null);
  };

  const componentMapper = {
    "화면 설정": (
      <DisplaySettings handleCloseComponent={handleCloseComponent} />
    ),
    "환경 설정": <Preference handleCloseComponent={handleCloseComponent} />,
    고객지원: <UserSurpport handleCloseComponent={handleCloseComponent} />,
    "업데이트 기록": (
      <UpdateHistory handleCloseComponent={handleCloseComponent} />
    ),
  } as const;
  const menuItems: Array<keyof typeof componentMapper> = [
    "화면 설정",
    "환경 설정",
    "고객지원",
    "업데이트 기록",
  ];

  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const { data } = await getUserSummary();
      setUserData(data.weeklyEssayCounts);
    } catch (err) {
      console.log(err);
    }
  };
  const navigateToComponent = (key: keyof typeof componentMapper) => {
    setSelectedComponent(componentMapper[key]);
  };
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return (
    <Layout>
      {selectedComponent ? (
        <DefaultLayout>{selectedComponent}</DefaultLayout>
      ) : (
        <Background />
      )}
      <ProfileDiv>
        <ProfileItemDiv>
          <CircularAvatar
            img={user?.profileImage ? user?.profileImage : DefaultProfile.src}
            width={80}
            height={80}
          />
          <ProfileHeaderText>
            <H1>
              <Strong>{user?.nickname}</Strong> 아무개
            </H1>
            <GreyText>43일째 링크드아웃!</GreyText>
          </ProfileHeaderText>
          <RightArrow
            onClick={() => {
              router.push("/web/mypage");
            }}
          />
        </ProfileItemDiv>
      </ProfileDiv>
      <GraphDiv>
        <GraphTitleDiv>
          <SmallText>주간 링크드아웃 지수</SmallText>
          <GreyText>{`${year}년 ${month}월 ${day}일 현재`}</GreyText>
        </GraphTitleDiv>
        <LineGraph
          data={userData}
          dataKey="count"
          xAxisKey="weekStart"
          height={160}
        ></LineGraph>
      </GraphDiv>
      <StoreDiv>
        <GeneralText>상점</GeneralText>
        <Chip>준비중</Chip>
      </StoreDiv>
      <Ul>
        {menuItems.map((item) => (
          <Li key={item} onClick={() => navigateToComponent(item)}>
            {item}
          </Li>
        ))}
      </Ul>
      <LogoutBtn>로그아웃</LogoutBtn>
    </Layout>
  );
}

export default Menu;
