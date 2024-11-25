import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultProfileImg from "@/shared/assets/img/default_profile.webp";
import Image from "next/image";
import color from "@/shared/styles/color";
import { useStore } from "@/shared/store";
import { getFollows } from "@/shared/api";

const Layout = styled.div`
  width: 80%;
  height: 100px;
  padding: 20px 147px;
  margin-bottom: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProfileDiv = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10.62px;
`;
const ProfileImgDiv = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  display: flex;
  gap: 17px;
  img {
    border-radius: 50px;
  }
`;
const ProfileName = styled.div`
  color: #656565;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  display: flex;
  gap: 5px;
  align-items: center;
  white-space: nowrap;
`;

const Strong = styled.strong`
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
const SubscribeBtn = styled.button<{ isFollow: boolean }>`
  border: none;
  padding: 0;
  margin: 0;
  width: 87px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${({ isFollow }) => (isFollow ? "#1D1D1D" : color.pointcolor)};
  color: ${({ isFollow }) => (isFollow ? color.pointcolor : "#000")};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  cursor: pointer;
`;

function splitByKeyword(str: string, keyword: string) {
  if (str.includes(keyword)) {
    const [firstPart] = str.split(keyword);
    return [firstPart];
  }
  return [str];
}

function UserProfile({
  userName,
  profileImage,
  submitFollows,
}: {
  userName: string;
  profileImage: string;
  submitFollows: (isFollow: boolean) => void;
}) {
  const [splitedUserName, setSplitedUserName] = useState<string[]>([]);
  const [isFollow, setIsFollow] = useState<null | boolean>(null);
  const user = useStore((state) => state.user);

  useEffect(() => {
    const splitedStringArr = splitByKeyword(userName, "아무개");
    setSplitedUserName(splitedStringArr);
    fetchFollows();
  }, [userName,submitFollows]);
  const fetchFollows = async () => {
    try {
      const { data, status } = await getFollows();
      // 추후 구독 api 수정되면 바꾸기
      if (status === 200) {
        const isFollow =
          data?.some((item) => item.nickname === userName) || false;
        setIsFollow(isFollow);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollows = async (isFollow: boolean) => {
    // 구독 여부에 따라 분기처리
    submitFollows(isFollow);
  };

  return (
    <Layout>
      <ProfileDiv>
        <ProfileImgDiv>
          <Image
            src={profileImage ? profileImage : DefaultProfileImg.src}
            alt="profile_image"
            width={60}
            height={60}
          ></Image>
        </ProfileImgDiv>
        <ProfileName>
          {splitedUserName[0]} <Strong>아무개</Strong>
        </ProfileName>
      </ProfileDiv>
      {user?.nickname !== userName && (
        <SubscribeBtn
          onClick={() => handleFollows(isFollow ?? false)}
          isFollow={isFollow ?? false}
        >
          {isFollow ? "구독중" : "구독하기"}
        </SubscribeBtn>
      )}
    </Layout>
  );
}

export default UserProfile;
