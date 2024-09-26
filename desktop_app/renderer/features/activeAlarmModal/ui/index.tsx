import { AlarmModal } from "@/shared/ui/modal";
import NoneAlarm from "./contents/noneAlarm";
import AlarmList from "./contents/alarmList";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { getAlramList } from "../api";
import { Alert } from "@/shared/types";
import InfiniteScroll from "react-infinite-scroll-component";

interface AlarmModalProps {
  isModalOpen: boolean;
  handleAlarmButtonClick: () => void;
}

interface RenderAlarmProps {
  list: Alert[];
  length: number;
  setAlarmList: Dispatch<SetStateAction<Alert[]>>;
}

const RenderAlarm = ({ list, length, setAlarmList }: RenderAlarmProps) => {
  return length === 0 ? (
    <NoneAlarm />
  ) : (
    <AlarmList list={list} setAlarmList={setAlarmList} />
  );
};

function Index({ isModalOpen, handleAlarmButtonClick }: AlarmModalProps) {
  const [alarmList, setAlarmList] = useState<Alert[]>([]);
  const [page, setPage] = useState(1);
  const [totalAlertPage, setTotalAlertPage] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    if (isFetching || (totalAlertPage && page > totalAlertPage)) return;
    setIsFetching(true);
    try {
      const { alerts, totalPage } = await getAlramList({
        page: page,
        limit: 20,
      });
      setAlarmList((prev) => [...prev, ...alerts]);
      setTotalAlertPage(totalPage);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <AlarmModal
      isOpen={isModalOpen}
      handleAlarmButtonClick={handleAlarmButtonClick}
    >
      <InfiniteScroll
        dataLength={alarmList.length}
        next={() => {
          if (totalAlertPage === null || page <= totalAlertPage) {
            setPage((prev) => prev + 1);
          }
        }}
        scrollableTarget="scrollableDiv"
        hasMore={totalAlertPage === null || page <= totalAlertPage}
        loader={null}
      >
        <RenderAlarm
          list={alarmList}
          length={alarmList.length}
          setAlarmList={setAlarmList}
        />
      </InfiniteScroll>
    </AlarmModal>
  );
}

export default Index;
