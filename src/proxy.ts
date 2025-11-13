import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_KEY = "poker_auth_token";

// 인증이 필요한 경로
const protectedRoutes = ["/room"];

// 인증된 사용자가 접근하면 안되는 경로 (로그인, 회원가입)
const authRoutes = ["/login", "/signup"];

// 메인 페이지는 인증 필요
const mainRoute = "/";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_KEY)?.value;

  // 인증이 필요한 경로 체크
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route)) || pathname === mainRoute;

  // 인증 페이지 체크 (로그인, 회원가입)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // 토큰이 없고 보호된 경로에 접근하려는 경우
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 토큰이 있고 로그인/회원가입 페이지에 접근하려는 경우
  if (token && isAuthRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

// 미들웨어를 실행할 경로 설정
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*|_next).*)"],
};
