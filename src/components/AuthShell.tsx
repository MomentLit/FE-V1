"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ACCESS_TOKEN_KEY } from "@/lib/current-user";

type AuthShellProps = {
  chipText: string;
  description: string;
  footerHref: string;
  footerLead: string;
  footerLink: string;
  primaryLabel: string;
  subtitle: string;
  title: string;
  variant: "login" | "signup";
};

type SignInResponse = {
  message: string;
  data: {
    name: string;
    role: string;
    access_token: string;
    refresh_token: string;
    expires_in: string;
  };
};

type SignUpResponse = {
  message: string;
  data?: {
    name?: string;
    role?: string;
    access_token?: string;
    refresh_token?: string;
    expires_in?: string | number;
  };
};

const REFRESH_TOKEN_KEY = "refreshToken";

function BrandText() {
  return <span className="text-[18px] font-semibold tracking-[0.02em] text-[#3CAEDB]">MomentLit</span>;
}

function BrandMark() {
  return (
    <Image alt="MomentLit" className="h-[78px] w-[112px] object-contain" height={78} src="/Logo.png" width={112} />
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  autoComplete,
  name,
  onChange,
  required = false,
  value,
}: {
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-[#172129]">{label}</span>
      <input
        className="h-[52px] rounded-2xl border border-[#C8E4E6] bg-white px-[18px] text-[15px] text-[#172129] outline-none placeholder:text-[#99A1B1]"
        autoComplete={autoComplete}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function SocialButton({
  bg,
  children,
  disabled = false,
  onClick,
  title,
}: {
  bg: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-[#D8ECEC] disabled:cursor-not-allowed disabled:opacity-60"
      style={{ backgroundColor: bg }}
      disabled={disabled}
      onClick={onClick}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <path d="M21.8 12.23c0-.74-.06-1.28-.19-1.84H12v3.48h5.65c-.11.86-.7 2.15-2.01 3.02l-.02.12 2.83 2.19.2.02c1.84-1.69 2.9-4.17 2.9-6.99Z" fill="#4285F4" />
      <path d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.23-2.5c-.86.6-2.02 1.02-3.54 1.02-2.7 0-4.99-1.78-5.81-4.25l-.11.01-2.95 2.28-.04.11A10.24 10.24 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.19 13.8A6.15 6.15 0 0 1 5.87 12c0-.63.11-1.24.31-1.8l-.01-.12-2.99-2.31-.1.05A10 10 0 0 0 2 12c0 1.61.38 3.13 1.06 4.48l3.13-2.68Z" fill="#FBBC05" />
      <path d="M12 5.95c1.92 0 3.22.83 3.96 1.52l2.89-2.82C17.07 3 14.76 2 12 2 8.06 2 4.67 4.26 3.08 7.52l3.1 2.4C7.01 7.73 9.3 5.95 12 5.95Z" fill="#EA4335" />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24">
      <path d="M12 4.2c-5.08 0-9.2 3.25-9.2 7.26 0 2.59 1.72 4.86 4.3 6.15l-.86 3.16c-.08.3.26.54.53.36l3.78-2.5c.47.06.95.1 1.45.1 5.08 0 9.2-3.25 9.2-7.27S17.08 4.2 12 4.2Z" fill="#191919" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <path d="M16.67 12.79c.02 2.35 2.06 3.13 2.08 3.14-.02.06-.32 1.1-1.05 2.18-.63.93-1.29 1.85-2.33 1.87-1.02.02-1.35-.6-2.51-.6-1.16 0-1.53.58-2.49.62-1 .04-1.77-1-2.41-1.92-1.31-1.89-2.31-5.34-.97-7.67.66-1.16 1.84-1.89 3.13-1.91.98-.02 1.9.66 2.51.66.61 0 1.76-.81 2.96-.69.5.02 1.9.2 2.8 1.52-.07.04-1.67.98-1.65 2.8Zm-2.02-5.76c.53-.64.89-1.53.79-2.42-.77.03-1.69.51-2.24 1.15-.49.56-.92 1.46-.81 2.32.86.07 1.73-.44 2.26-1.05Z" fill="#FFFFFF" />
    </svg>
  );
}

export function AuthShell({
  chipText,
  description,
  footerHref,
  footerLead,
  footerLink,
  primaryLabel,
  subtitle,
  title,
  variant,
}: AuthShellProps) {
  const router = useRouter();
  const isLogin = variant === "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setAuthError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post<SignInResponse>(
        "/api/auth/signin",
        {
          email: trimmedEmail,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          timeout: 10000,
        },
      );

      const auth = response.data?.data;

      if (!auth?.access_token || !auth?.refresh_token) {
        throw new Error("로그인 응답이 올바르지 않습니다.");
      }

      window.localStorage.setItem(ACCESS_TOKEN_KEY, auth.access_token);
      window.localStorage.setItem(REFRESH_TOKEN_KEY, auth.refresh_token);
      window.localStorage.removeItem("access_token");

      router.replace("/");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.status === 403
            ? "로그인 API가 서버에서 403으로 차단되고 있습니다."
            : typeof error.response?.data?.message === "string"
              ? error.response.data.message
              : "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";

        setAuthError(message);
      } else {
        setAuthError("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleGoogleSignIn() {
    window.location.assign("/api/auth/oauth/google");
  }

  function handleUnavailableOAuth(provider: string) {
    setAuthError(`${provider} 로그인은 아직 연결되지 않았습니다.`);
  }

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setAuthError("이름, 이메일, 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (password.length < 8) {
      setAuthError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setAuthError("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!agreeTerms) {
      setAuthError("이용약관 및 개인정보 처리방침에 동의해주세요.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post<SignUpResponse>(
        "/api/auth/signup",
        {
          name: trimmedName,
          email: trimmedEmail,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          timeout: 10000,
        },
      );

      const auth = response.data?.data;

      if (auth?.access_token && auth?.refresh_token) {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, auth.access_token);
        window.localStorage.setItem(REFRESH_TOKEN_KEY, auth.refresh_token);
        window.localStorage.removeItem("access_token");
        router.replace("/");
        router.refresh();
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.status === 403
            ? "회원가입 API가 서버에서 403으로 차단되고 있습니다."
            : typeof error.response?.data?.message === "string"
              ? error.response.data.message
              : "회원가입에 실패했습니다. 입력값을 확인해주세요.";

        setAuthError(message);
      } else {
        setAuthError("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#F6FCFC_0%,#EEF7F7_52%,#E4F1F2_100%)] p-6">
      <div className="grid min-h-[calc(100vh-48px)] w-full grid-cols-[minmax(0,1.24fr)_minmax(0,0.76fr)] gap-6 overflow-hidden rounded-[32px]">
        <section className="flex flex-col justify-between rounded-[28px] border border-white/40 bg-[linear-gradient(160deg,#EAFBFC_0%,#9FE3E7_52%,#00ADB5_100%)] px-10 pb-12 pt-10">
          <div className="flex flex-col gap-5">
            <BrandText />
            <h1 className="w-[420px] whitespace-pre-line text-[50px] font-semibold leading-[1.08] text-[#062B2E]">
              {"공간에는 가치를,\n브랜드에는 기회를"}
            </h1>
            <p className="w-[420px] text-[18px] leading-[1.5] text-[#114D52]">{subtitle}</p>
          </div>

          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/60 bg-white/50 px-[18px] py-3">
            <span className="h-[10px] w-[10px] rounded-full bg-[#00ADB5]" />
            <span className="text-[14px] font-medium text-[#08373B]">{chipText}</span>
          </div>
        </section>

        <section
          className={`flex items-center justify-center rounded-[28px] border border-[#D8ECEC] bg-white/90 px-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ${isLogin ? "py-7" : "py-9"}`}
        >
          <div className={`flex w-[360px] flex-col ${isLogin ? "gap-4" : "min-h-[652px] justify-between"}`}>
            {isLogin ? (
              <div className="mb-1 flex justify-center">
                <BrandMark />
              </div>
            ) : null}

            <div className="flex flex-col gap-2.5">
              <p className="text-[12px] font-medium text-[#00ADB5]">{description}</p>
              <h2 className="text-[38px] font-bold text-[#172129]">{title}</h2>
              <p className="text-[15px] leading-[1.5] text-[#5D6B6C]">{primaryLabel}</p>
            </div>

            {variant === "login" ? (
              <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
                <Field
                  autoComplete="email"
                  label="아이디"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="MomentLit-id"
                  required
                  value={email}
                />
                <Field
                  autoComplete="current-password"
                  label="비밀번호"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 text-[14px] text-[#7B8C8E]">
                    <input
                      checked={rememberMe}
                      className="h-[18px] w-[18px] cursor-pointer rounded-[5px] border border-[#B8DADD] bg-[#F4FBFB] accent-[#00ADB5]"
                      id="remember-me"
                      name="rememberMe"
                      onChange={(event) => setRememberMe(event.target.checked)}
                      type="checkbox"
                    />
                    로그인 상태 유지
                  </label>
                  <button className="text-[13px] font-medium text-[#008992]" type="button">
                    아이디/비밀번호 찾기
                  </button>
                </div>

                {authError ? (
                  <p className="rounded-2xl bg-[#FFF3F3] px-4 py-3 text-[13px] font-medium text-[#B34848]">
                    {authError}
                  </p>
                ) : null}

                <button
                  className="h-14 rounded-full bg-[#00ADB5] text-[15px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? "로그인 중..." : "로그인"}
                </button>

                <p className="pt-1 text-center text-[13px] font-medium text-[#7B8C8E]">간편 회원가입</p>

                <div className="flex gap-3">
                  <SocialButton bg="#FFFFFF" onClick={handleGoogleSignIn} title="Google로 로그인">
                    <GoogleIcon />
                  </SocialButton>
                  <SocialButton bg="#FEE500" onClick={() => handleUnavailableOAuth("카카오")} title="카카오 로그인">
                    <KakaoIcon />
                  </SocialButton>
                  <SocialButton bg="#111111" onClick={() => handleUnavailableOAuth("애플")} title="애플 로그인">
                    <AppleIcon />
                  </SocialButton>
                </div>
              </form>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
                <Field
                  autoComplete="name"
                  label="이름"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="홍길동"
                  required
                  value={name}
                />
                <Field
                  autoComplete="email"
                  label="이메일"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="MomnetLit@example.com"
                  required
                  value={email}
                />
                <Field
                  autoComplete="new-password"
                  label="비밀번호"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  type="password"
                  value={password}
                />
                <Field
                  autoComplete="new-password"
                  label="비밀번호 확인"
                  name="confirmPassword"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  type="password"
                  value={confirmPassword}
                />

                {authError ? (
                  <p className="rounded-2xl bg-[#FFF3F3] px-4 py-3 text-[13px] font-medium text-[#B34848]">
                    {authError}
                  </p>
                ) : null}

                <label className="my-2 flex items-center gap-2.5 py-1.5 text-[13px] text-[#7B8C8E]">
                  <input
                    checked={agreeTerms}
                    className="h-[18px] w-[18px] cursor-pointer rounded-[5px] border border-[#B8DADD] bg-[#F4FBFB] accent-[#00ADB5]"
                    id="agree-terms"
                    name="agreeTerms"
                    onChange={(event) => setAgreeTerms(event.target.checked)}
                    type="checkbox"
                  />
                  이용약관 및 개인정보 처리방침에 동의합니다.
                </label>

                <button
                  className="h-14 rounded-full bg-[#00ADB5] text-[15px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? "회원가입 중..." : "회원가입"}
                </button>
              </form>
            )}

            <p className="text-center text-[14px] text-[#5D6B6C]">
              {footerLead}{" "}
              <Link className="text-[#008992]" href={footerHref}>
                {footerLink}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
