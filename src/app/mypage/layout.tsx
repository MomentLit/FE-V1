import type { ReactNode } from "react";
import { MyPageShell } from "@/components/mypage/MyPageShell";

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return <MyPageShell>{children}</MyPageShell>;
}
