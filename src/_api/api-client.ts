import { tokenStorage } from "@/_lib/auth";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/v1",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
  withCredentials: true, // 쿠키 자동 전송 활성화
});

export default apiClient;

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      tokenStorage.remove();
      // TODO: 토큰 재발급 API 호출하기
    }
    return Promise.reject(error);
  }
);
