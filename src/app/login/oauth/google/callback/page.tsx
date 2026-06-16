"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ACCESS_TOKEN_KEY } from "@/lib/current-user";

const REFRESH_TOKEN_KEY = "refreshToken";

type GoogleCallbackResponse = {
  message: string;
  data?: {
    name?: string;
    role?: string;
    access_token?: string;
    refresh_token?: string;
    expires_in?: string | number;
  };
};

export default function GoogleOAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const [message, setMessage] = useState(
    code ? "구글 로그인 처리 중..." : "인증 코드가 없습니다. 다시 시도해주세요.",
  );

  useEffect(() => {
    if (!code) {
      return;
    }

    let cancelled = false;

    async function completeOAuth() {
      try {
        const response = await axios.get<GoogleCallbackResponse>("/api/auth/oauth/google/callback", {
          params: {
            code,
            ...(state ? { state } : {}),
          },
          headers: {
            Accept: "application/json",
          },
          timeout: 10000,
        });

        const auth = response.data?.data;

        if (!auth?.access_token || !auth?.refresh_token) {
          throw new Error("구글 로그인 응답이 올바르지 않습니다.");
        }

        window.localStorage.setItem(ACCESS_TOKEN_KEY, auth.access_token);
        window.localStorage.setItem(REFRESH_TOKEN_KEY, auth.refresh_token);
        window.localStorage.removeItem("access_token");

        if (!cancelled) {
          router.replace("/");
          router.refresh();
        }
      } catch (error) {
        if (!cancelled) {
          const fallback =
            axios.isAxiosError(error) && typeof error.response?.data?.message === "string"
              ? error.response.data.message
              : "구글 로그인에 실패했습니다. 다시 시도해주세요.";
          setMessage(fallback);
        }
      }
    }

    completeOAuth();

    return () => {
      cancelled = true;
    };
  }, [code, router, state]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6FCFC] px-6">
      <section className="w-full max-w-md rounded-[28px] border border-[#D8ECEC] bg-white px-8 py-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <p className="text-[18px] font-semibold text-[#172129]">MomentLit</p>
        <h1 className="mt-4 text-[30px] font-bold text-[#172129]">Google 로그인</h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-[#5D6B6C]">{message}</p>
      </section>
    </main>
  );
}
