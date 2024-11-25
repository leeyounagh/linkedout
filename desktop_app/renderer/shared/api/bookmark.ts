import { fetchData } from "@/shared/api/fetchData";
import { Essay } from "../types";

interface BookmarksType {
  essays: Essay[];
  totalPage: number;
}

export const getBookmarks = async (page: number, limit: number) => {
  try {
    const params = {
      page: page,
      limit: limit,
    };
    const { data, status } = await fetchData<BookmarksType>(
      "bookmarks",
      "get",
      null,
      { params }
    );
    return { data: data.essays, totalPage: data.totalPage, status: status };
  } catch (err) {
    console.log(err);
    return { data: [], status: 500 };
  }
};
export const allEssayDelete = async (ids: number[]) => {
  try {
    const body = {
      essayIds: ids,
    };
    const { status } = await fetchData("bookmarks", "put", body);
    return { status: status };
  } catch (err) {
    console.log(err);
    return { data: [], status: 500 };
  }
};
