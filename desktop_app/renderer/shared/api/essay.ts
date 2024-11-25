import { Essay } from "@/shared/types";
import { fetchData } from "@/shared/api/fetchData";

interface dataType {
  essay: Essay;
  anotherEssays: { essays: Essay[] };
}
interface bodyType {
  title?: string;
  content?: string;
  status?: string;
  tags?: string[];
  location?: string;
  thumbnail?: string;
}
type ImageResponse = {
  imageUrl: string;
};
export const getEssayDetail = async (
  pageType: string,
  essayId: number,
  storyId: number | null
) => {
  try {
    const params = {
      pageType: pageType,
      ...(storyId && { storyId: storyId }),
    };
    const { data: detailData, status: detailStatus } =
      await fetchData<dataType | null>(`essays/${essayId}`, "get", null, {
        params,
      });
    return { data: detailData, status: detailStatus };
  } catch (err) {
    return { data: null, status: 500 };
  }
};

export const updateEssayDetail = async (
  formData: FormData | null,
  body: bodyType,
  essayId: number
) => {
  try {
    if (formData) {
      const formDataEmpty = Array.from(formData.entries()).reduce(
        (acc, [key, value]) => {
          return false;
        },
        true
      );

      if (!formDataEmpty) {
        const { data: imageData, status: imageStatus } =
          await fetchData<ImageResponse>("essays/images", "post", formData);
        if (imageStatus === 201) {
          body.thumbnail = imageData.imageUrl;
        }
      }
    }
    const { data, status } = await fetchData(`essays/${essayId}`, "put", body);
    return { data, status };
  } catch (err) {
    console.log("err", err);
    return { data: null, status: 500 };
  }
};

export const addEssayBookMark = async (id: number) => {
  try {
    const { status } = await fetchData(`bookmarks/${id}`, "post");
    return { status: status };
  } catch (err) {
    return { status: 500 };
  }
};

export const deleteEssayBookMark = async (id: number) => {
  try {
    const body = {
      essayIds: [id],
    };
    const { status } = await fetchData(`bookmarks`, "put", body);
    return { status: status };
  } catch (err) {
    return { status: 500 };
  }
};

export const reportEssay = async (id: number, reason: string) => {
  try {
    const body = {
      reason: reason,
    };
    const { status } = await fetchData(`reports/${id}`, "post", body);
    return { status: status };
  } catch (err) {
    return { status: 500 };
  }
};

interface EssayDataType {
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
    const { data } = await fetchData<EssayDataType>("essays", "get", null, {
      params,
    });
    return { data: data.essays, totalPage: data.totalPage, total: data.total };
  } catch (err) {
    return { data: [], totalPage: 1, total: 0 };
  }
};

export const getUserEssays = async (storyId: number) => {
  try {
    const params = {
      storyId: storyId,
    };
    const { data } = await fetchData<EssayDataType>(
      `essays/${storyId}`,
      "get",
      null,
      {
        params,
      }
    );
    return { data: data };
  } catch (err) {
    return { data: [] };
  }
};

export const getRandomEssays = async (limit?: number) => {
  try {
    const params = {
      limit: limit,
    };
    const { data } = await fetchData<any>("essays/recommend", "get", null, {
      params,
    });
    return { data: data.essays };
  } catch (err) {
    return { data: [] };
  }
};

export const getSentence = async (type: string) => {
  try {
    const params = {
      type: type,
      limit: 15,
    };
    const { data } = await fetchData<any>("essays/sentence", "get", null, {
      params,
    });
    return { data: data.essays };
  } catch (err) {
    return { data: [] };
  }
};
export const getFollowingsEssay = async (page: number) => {
  try {
    const params = {
      page: page,
      limit: 10,
    };
    const { data, status } = await fetchData<any>(
      "essays/followings",
      "get",
      null,
      {
        params,
      }
    );
    return { data: data.essays, totalPage: data.totalPage, status };
  } catch (err) {
    return { data: [], status: 500, totalPage: null };
  }
};
export const searchEssay = async (pageType:string,keyword:string) => {
  try {
    const params = {
      pageType: pageType,
      keyword: keyword,
    };
    const { data, status, } = await fetchData<any>(
      "essays/search",
      "get",
      null,
      {
        params,
      }
    );
    return { data: data.essays, totalPage: data.totalPage,total:data.total, status };
  } catch (err) {
    return { data: [], status: 500 };
  }
};
