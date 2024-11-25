import { fetchData } from "@/shared/api/fetchData";
import { Essay } from "@/shared/types";

interface dataType {
  essays: Essay[];
  page: number;
  total: number;
  totalPage: number;
}

export const getEssays = async (
  page: number,
  limit: number,
  pageType: string,
  storyId?: number
) => {
  try {
    const params = {
      page: page,
      limit: limit,
      pageType: pageType,
      ...(storyId && { storyId: storyId }),
    };
    const { data } = await fetchData<dataType>("essays", "get", null, {
      params,
    });
    return { data: data.essays, totalPage: data.totalPage };
  } catch (err) {
    return { data: [], totalPage: 1 };
  }
};

export const getRandomEssays = async () => {
  try {
    const params = {
      limit: 4,
    };
    const { data } = await fetchData<dataType>(
      "essays/recommend",
      "get",
      null,
      {
        params,
      }
    );
    return { data: data.essays };
  } catch (err) {
    return { data: [] };
  }
};

export const deleteEssay = async (id: number) => {
  try {
    const { status } = await fetchData<any>(`essays/${id}`, "delete");
    return { status: status };
  } catch (err) {
    return { status: 500 };
  }
};

export const getNextEssay = async (
  id: number,
  pageType: string,
  storyId?: number
) => {
  try {
    const params = {
      pageType: pageType,
      ...(storyId && { storyId: storyId }),
    };
    const { data, status } = await fetchData<any>(
      `essays/next/${id}`,
      "get",
      null,
      {
        params,
      }
    );
    return { data: data.essay, status:status };
  } catch (err) {
    return { data: {}, status: 500 };
  }
};
