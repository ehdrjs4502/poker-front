import { getMyInfo, signin, signup } from "@/_api/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./keys";

export const useSignin = () => {
  return useMutation({
    mutationFn: ({
      accountId,
      password,
    }: {
      accountId: string;
      password: string;
    }) => signin(accountId, password),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: ({
      accountId,
      password,
      nickname,
    }: {
      accountId: string;
      password: string;
      nickname: string;
    }) => signup(accountId, password, nickname),
  });
};

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: QUERY_KEYS.MY_INFO,
    queryFn: getMyInfo,
  });
};
