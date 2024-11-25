import { fetchData } from "@/shared/api/fetchData";
import { pageType, Alert, AlarmListResponse } from "@/shared/types";

interface AlarmListResult {
  alerts: Alert[];
  totalPage: number;
  total: number;
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

    return {
      alerts: data?.alerts || [],
      totalPage: data?.totalPage || 0,
      total: data?.total,
    };
  } catch (err) {
    console.log("Err", err);
    return { alerts: [], totalPage: 0, total: 0 };
  }
};

interface UpdateStatusResponse {
  data?: any[];
}
export const updateReadStatus = async (
  id: number,
  list:any[],
) : Promise<UpdateStatusResponse | undefined> => {
  try {
    const alertToUpdate = list.find((alert) => alert.id === id);

    if (alertToUpdate && alertToUpdate.read) {
      console.log("Alert is already read.");
      return;
    }

    const { status } = await fetchData(`alerts/read/${id}`, "patch");
    console.log("status", status);
    if (status === 200) {
      const updatedList = list.map((alert) =>
        alert.id === id ? { ...alert, read: true } : alert
      );
      return { data: updatedList };
    }
  } catch (err) {
    return { data: [] };
    console.log("Err", err);
  }
};
