import { fetchData } from "@/shared/api/fetchData";

export const getUserSummary = async () => {
  try {
    const { data, status } = await fetchData<any>("users/summary", "get");
    return { data: data, status: status };
  } catch (err) {
    console.log(err);
    return { data: [], status: 500 };
  }
};
