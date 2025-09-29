import apiClient from "./api-client";

export const signin = async (accountId: string, password: string) => {
  const response = await apiClient.post("/users/signin", {
    accountId,
    password,
  });
  return response.data;
};

export const signup = async (
  accountId: string,
  password: string,
  nickname: string
) => {
  const response = await apiClient.post("/users/signup", {
    accountId,
    password,
    nickname,
  });
  return response.data;
};

export const getMyInfo = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};
