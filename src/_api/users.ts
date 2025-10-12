import apiClient from "./api-client";

export type SigninRequest = {
  accountId: string;
  password: string;
};

export type SignupRequest = {
  accountId: string;
  password: string;
  nickname: string;
};

export const signin = async (request: SigninRequest) => {
  const response = await apiClient.post("/users/signin", request);
  return response.data;
};

export const signup = async (request: SignupRequest) => {
  const response = await apiClient.post("/users/signup", request);
  return response.data;
};

export const getMyInfo = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};
