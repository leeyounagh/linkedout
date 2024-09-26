import { fetchData } from "@/shared/api/fetchData";
import { pageType, Alert, AlarmListResponse } from "@/shared/types";

interface AlarmListResult {
  alerts: Alert[];
  totalPage: number;
}

export const getAlramList = async ({
  page,
  limit,
}: pageType): Promise<AlarmListResult> => {
  try {
    const params = {
      page: page,
      limit: limit,
    };
    const { data } = await fetchData<AlarmListResponse>(`alerts`, "get", null, {
      params,
    });

    return { alerts: data?.alerts || [], totalPage: data?.totalPage || 0 };
  } catch (err) {
    console.log("Err", err);
    return { alerts: [], totalPage: 0 };
  }
};
export const updateReadStatus = async (
  id: number,
  list: Alert[],
  setAlarmList: React.Dispatch<React.SetStateAction<Alert[]>>
) => {
  try {
    const alertToUpdate = list.find(alert => alert.id === id);

    if (alertToUpdate && alertToUpdate.read) {
      console.log("Alert is already read.");
      return;
    }

    const { status } = await fetchData(`alerts/read/${id}`, "patch");
    if (status === 200) {
      const updatedList = list.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      );
      setAlarmList(updatedList);
    }
  } catch (err) {
    console.log("Err", err);
  }
};
