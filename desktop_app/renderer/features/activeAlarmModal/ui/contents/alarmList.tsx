import React, { useState, Dispatch, SetStateAction } from "react";
import { GeneralCard } from "@/shared/ui/card";
import { CircularAvatar } from "@/shared/ui/avatar";
import LinkedoutLetter from "@/shared/assets/img/linkedout_letter.webp";
import styled from "styled-components";
import { Label } from "@/shared/ui/label";
import TextField from "./textField";
import LetterImg from "@/shared/assets/img/letter.webp";
import Letter from "./letter";
import { Alert } from "@/shared/types";
import { formatDateString } from "@/shared/lib/date";
import Imformation from "@/shared/assets/img/information.webp";
import { updateReadStatus } from "../../api";

const Layout = styled.div`
  position: absolute;
  top: 96px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;
const Time = styled.time`
  color: #3e3e3e;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;
const AvatarLayout = styled.div`
  position: relative;
`;
const LabelDiv = styled.div`
  position: absolute;
  top: 67px;
  left: 0px;
`;
type MapperKey = "published" | "support" | "linkedout";
interface NotificationConfig {
  isShow: boolean;
}
const mapper = {
  published: { img: LetterImg, label: "발행한 글" },
  support: { img: Imformation, label: "고객지원" },
  linkedout: { img: LinkedoutLetter, label: "Linked-out" },
};
const handleNotification = (
  type: MapperKey,
  title: string,
  createdDate: string,
  handleCloseModal?: () => void
) => {
  const notificationMapper: Record<MapperKey, NotificationConfig> = {
    published: {
      isShow: false,
    },
    support: {
      isShow: true,
    },
    linkedout: {
      isShow: true,
    },
  };

  const component = notificationMapper[type].isShow ? (
    <Letter
      type={type}
      title={title}
      createdDate={createdDate}
      handleCloseModal={handleCloseModal}
    />
  ) : null;

  return { component: component };
};
function AlarmList({
  list,
  setAlarmList,
}: {
  list: Alert[];
  setAlarmList: Dispatch<SetStateAction<Alert[]>>;
}) {
  const [renderedComponent, setRenderedComponent] =
    useState<React.ReactNode | null>(null);

  const renderedDates = new Set<string>();

  const handleCardClick = async (
    id: number,
    type: MapperKey,
    title: string,
    createdDate: string
  ) => {
    await updateReadStatus(id, list, setAlarmList);
    const { component } = handleNotification(
      type,
      title,
      createdDate,
      handleCloseModal
    );
    if (component) {
      setRenderedComponent(component);
    }
  };
  const handleCloseModal = () => {
    setRenderedComponent(null);
  };

  return (
    <Layout>
      {list.map((item) => {
        const { img, label } = mapper[item.type as MapperKey];
        const width =
          item.type === "linkedout" ? 97 : item.type === "support" ? 26 : 65;
        const height =
          item.type === "linkedout" ? 55 : item.type === "support" ? 26 : 59;

        const formattedDate = formatDateString(item.createdDate);
        const isFirstOccurrence = !renderedDates.has(formattedDate);
        if (isFirstOccurrence) {
          renderedDates.add(formattedDate);
        }

        return (
          <>
            {isFirstOccurrence && <Time>{formattedDate}</Time>}
            <GeneralCard
              key={item.id}
              isFocused={!item.read}
              onClick={() =>
                handleCardClick(
                  item.id,
                  item.type,
                  item.title,
                  item.createdDate
                )
              }
            >
              <AvatarLayout>
                <CircularAvatar img={img} width={width} height={height} />
                <LabelDiv>
                  <Label text={label} />
                </LabelDiv>
              </AvatarLayout>
              <TextField
                createdDate={item.createdDate}
                title={item.title}
                type={item.type}
              />
            </GeneralCard>
          </>
        );
      })}
      {renderedComponent}
    </Layout>
  );
}

export default AlarmList;
