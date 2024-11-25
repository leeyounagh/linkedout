import { AlarmModal } from "@/shared/ui/modal";
import NoneAlarm from "./contents/noneAlarm";
import AlarmList from "./contents/alarmList";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { getAlramList } from "../api";
import { Alert } from "@/shared/types";
import { Virtuoso } from "react-virtuoso";
import styled from "styled-components";

const ContentsContainer = styled.div`
  width: 100%;
  height:80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
  margin-top: 19px;
  overflow-y: auto;
`;
interface AlarmModalProps {
  isModalOpen: boolean;
  handleAlarmButtonClick: () => void;
}

interface RenderAlarmProps {
  list: Alert[];
  length: number;
  setAlarmList: Dispatch<SetStateAction<any>>;
}

// const RenderAlarm = ({ list, length, setAlarmList }: RenderAlarmProps) => {
//   return length === 0 ? (
//     <NoneAlarm />
//   ) : (
//     <AlarmList list={list} setAlarmList={setAlarmList} />
//   );
// };

function ActiveAlramList({
  isModalOpen,
  handleAlarmButtonClick,
}: AlarmModalProps) {
  const [alarmList, setAlarmList] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const { alerts, totalPage } = await getAlramList({
        page: page,
        limit: 20,
      });
      setAlarmList((prev: any) => [...prev, ...alerts]);
      if (page >= totalPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };
  useEffect(() => {
    if (hasMore) {
      fetchData();
    }
  }, [page]);

  const loadMoreItems = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <AlarmModal
      isOpen={isModalOpen}
      handleAlarmButtonClick={handleAlarmButtonClick}
    >
      <ContentsContainer>
        {alarmList.length > 0 ? (
          <Virtuoso
            style={{ height: "1150px", width: "100%" }}
            data={alarmList}
            endReached={loadMoreItems}
            itemContent={(index, item) => (
              <AlarmList key={index} list={item} setAlarmList={setAlarmList} />
            )}
          />
        ) : (
          <NoneAlarm />
        )}
      </ContentsContainer>
    </AlarmModal>
  );
}

export default ActiveAlramList;
