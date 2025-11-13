"use client";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { useSignin } from "@/_hooks/query/users";
import { tokenStorage } from "@/_lib/auth";
import { IMAGES } from "@/_lib/constants/images";
import { PATH } from "@/_lib/constants/path";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const styles = {
  formInput: "w-full bg-neutral-100 text-black",
  formLabel: "block text-sm font-medium text-gray-300 mb-1",
  authContainer: "flex flex-col items-center justify-center min-h-screen bg-neutral-950 px-4",
  authCard: "bg-neutral-950 px-10 py-8 rounded-lg shadow-md border border-neutral-600",
  authLink: "text-blue-400 hover:text-blue-300 font-medium",
  authLinkMuted: "text-neutral-500 hover:text-neutral-400",
} as const;

export default function LoginPage() {
  const { mutate: signinMutation } = useSignin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const accountId = formData.get("accountId") as string;
    const password = formData.get("password") as string;

    if (!accountId || !password) {
      toast.error("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    signinMutation(
      { request: { accountId, password } },
      {
        onSuccess: (response) => {
          tokenStorage.set(response.data.token);
          router.push(PATH.MAIN);
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
            <Image src={IMAGES.ICONS.LOGO} alt="Logo" width={100} height={110} />
            <span className="text-2xl font-bold mt-4 text-white">Poker Game</span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id" className={styles.formLabel}>
                아이디
              </label>
              <Input id="accountId" name="accountId" type="text" placeholder="아이디를 입력하세요" />
            </div>

            <div>
              <label htmlFor="password" className={styles.formLabel}>
                비밀번호
              </label>
              <Input id="password" name="password" type="password" placeholder="비밀번호를 입력하세요" />
            </div>
            <Button className="w-full mt-6" type="submit">
              로그인
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-neutral-400">
              계정이 없으신가요?{" "}
              <Link href={PATH.SIGNUP} className={styles.authLink}>
                회원가입
              </Link>
            </p>
            <p className="text-sm">
              <Link href="#" className={styles.authLinkMuted}>
                비밀번호를 잊으셨나요?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
