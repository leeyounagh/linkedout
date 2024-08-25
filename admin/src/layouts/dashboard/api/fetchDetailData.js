import AxiosInstance from "../../../api/AxiosInstance";

export const fetchDetailData = async (info, setState) => {
  try {
    const { url, params } = info;
    const response = await AxiosInstance.get("/admin-dashboard/stats" + url, {
      params: params,
    });
    const data = Object.values(response.data.data);
    setState((prev) => ({ ...prev, datasets: { label: "apps", data: data } }));
  } catch (err) {
    console.log(err);
  }
};
