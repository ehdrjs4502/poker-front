export const TOKEN_KEY = "poker_auth_token";

// 쿠키 유틸리티 함수
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  // secure와 sameSite 옵션으로 보안 강화
  // production에서는 secure: true 사용 권장
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
};

const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const tokenStorage = {
  set: (token: string) => {
    setCookie(TOKEN_KEY, token, 7); // 7일간 유효
  },

  get: (): string | null => {
    return getCookie(TOKEN_KEY);
  },

  remove: () => {
    deleteCookie(TOKEN_KEY);
  },

  exists: (): boolean => {
    return !!tokenStorage.get();
  },
};
