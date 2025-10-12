import {
  getMyInfo,
  signin,
  SigninRequest,
  signup,
  SignupRequest,
} from "@/_api/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./keys";

export const useSignin = () => {
  return useMutation({
    mutationFn: ({ request }: { request: SigninRequest }) => signin(request),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: ({ request }: { request: SignupRequest }) => signup(request),
  });
};

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: QUERY_KEYS.MY_INFO,
    queryFn: getMyInfo,
  });
};
