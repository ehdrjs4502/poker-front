"use client";
import { IMAGES } from "@/_lib/constants/images";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PATH } from "@/_lib/constants/path";
import { useSignup } from "@/_hooks/query/users";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const styles = {
  formInput: "w-full bg-neutral-100 text-black",
  formLabel: "block text-sm font-medium text-gray-300 mb-1",
  authContainer:
    "flex flex-col items-center justify-center min-h-screen bg-neutral-950 px-4",
  authCard:
    "bg-neutral-950 px-10 py-8 rounded-lg shadow-md border border-neutral-600",
  authLink: "text-blue-400 hover:text-blue-300 font-medium",
  authLinkMuted: "text-neutral-500 hover:text-neutral-400",
} as const;

export default function SignupPage() {
  const { mutate: signupMutation } = useSignup();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const accountId = formData.get("accountId") as string;
    const password = formData.get("password") as string;
    const nickname = formData.get("nickname") as string;

    if (!accountId || !password || !nickname) {
      return;
    }

    signupMutation(
      { accountId, password, nickname },
      {
        onSuccess: () => {
          toast.success("회원가입에 성공했습니다.");
          router.push(PATH.LOGIN);
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
        },
      }
    );
  };

  return (
    <div className={styles.authContainer}>
      <div className="w-full max-w-md">
        <div className={styles.authCard}>
          <div className="flex flex-col items-center justify-center mb-8">
            <Image
              src={IMAGES.ICONS.LOGO}
              alt="Logo"
              width={100}
              height={110}
            />
            <span className="text-2xl font-bold mt-4 text-white">
              Poker Game
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id" className={styles.formLabel}>
                아이디
              </label>
              <Input
                id="accountId"
                name="accountId"
                type="text"
                placeholder="아이디를 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="password" className={styles.formLabel}>
                비밀번호
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="nickname" className={styles.formLabel}>
                닉네임
              </label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              회원가입
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-neutral-400">
              <Link href={PATH.LOGIN} className={styles.authLink}>
                로그인 페이지로 이동
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
