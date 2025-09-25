import * as React from "react";

import { cn } from "@/_lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  theme?: "light" | "dark";
}

const themeStyles = {
  light: [
    // 라이트 테마 스타일
    "bg-white text-black border-gray-300",
    "placeholder:text-gray-500",
    "focus-visible:border-neutral-500 focus-visible:ring-neutral-500/50 focus-visible:ring-2",
    "hover:border-gray-400",
    "disabled:bg-gray-100",
  ].join(" "),

  dark: [
    // 다크 테마 스타일 (기존 shadcn 스타일)
    "bg-transparent border-input dark:bg-input/30",
    "text-foreground placeholder:text-muted-foreground",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "selection:bg-primary selection:text-primary-foreground",
  ].join(" "),
};

function Input({ className, type, theme = "light", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 공통 기본 스타일
        "h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-sm transition-colors outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-sm",
        // 테마별 스타일
        themeStyles[theme],
        // 에러 상태 스타일
        theme === "light"
          ? "aria-invalid:border-red-500 aria-invalid:ring-red-500/20"
          : "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
