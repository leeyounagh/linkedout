import { fetchData } from "@/shared/api/fetchData";
import { Users } from "../types";

interface UserType {
  followings: Users;
  totalPage: number;
}

export const getFollows = async () => {
  try {
    const { data, status } = await fetchData<UserType>(`follows`, "get");
    return { data: data?.followings, status: status };
  } catch (err) {
    return { data: null, status: 500 };
  }
};

export const postFollows = async (userId: number) => {
  try {
    const { status } = await fetchData(`follows/${userId}`, "post");
    return { status: status };
  } catch (err) {
    return { status: 500 };
  }
};

export const deleteFollow = async (userId: number) => {
  try {
    const { status } = await fetchData(`follows/${userId}`, "delete");
    return { status: status };
  } catch (err) {
    return { status: 500 };
  }
};

export const getAuthorEssays = async (id: number) => {
  try {
    const { data, status } = await fetchData<any>(
      `essays/author/${id}`,
      "get"
    );
    return { status: status, data: data?.essays, totalPage: data.totalPage };
  } catch (Err) {
    return { status: 500, totalPage: 1, data: [] };
  }
};
