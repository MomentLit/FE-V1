import Image from "next/image";
import Link from "next/link";

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
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-[#172129]">{label}</span>
      <input
        className="h-[52px] rounded-2xl border border-[#C8E4E6] bg-white px-[18px] text-[15px] text-[#172129] outline-none placeholder:text-[#99A1B1]"
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}

function SocialButton({
  bg,
  children,
}: {
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-[#D8ECEC]"
      style={{ backgroundColor: bg }}
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
  const isLogin = variant === "login";

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
          className={`flex items-center justify-center rounded-[28px] border border-[#D8ECEC] bg-white/90 px-9 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ${isLogin ? "py-8" : "py-10"}`}
        >
          <div className={`flex w-[380px] flex-col ${isLogin ? "gap-[18px]" : "min-h-[652px] justify-between"}`}>
            {isLogin ? (
              <div className="mb-1 flex justify-center">
                <BrandMark />
              </div>
            ) : null}

            <div className="flex flex-col gap-2.5">
              <p className="text-[13px] font-medium text-[#00ADB5]">{description}</p>
              <h2 className="text-[40px] font-bold text-[#172129]">{title}</h2>
              <p className="text-[16px] leading-[1.5] text-[#5D6B6C]">{primaryLabel}</p>
            </div>

            {variant === "login" ? (
              <>
                <Field label="아이디" placeholder="MomentLit-id" />
                <Field label="비밀번호" placeholder="••••••••" type="password" />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 text-[15px] text-[#7B8C8E]">
                    <span className="h-[18px] w-[18px] rounded-[5px] border border-[#B8DADD] bg-[#F4FBFB]" />
                    로그인 상태 유지
                  </label>
                  <button className="text-[14px] font-medium text-[#008992]" type="button">
                    아이디/비밀번호 찾기
                  </button>
                </div>

                <button className="h-[58px] rounded-full bg-[#00ADB5] text-[16px] font-medium text-white" type="button">
                  로그인
                </button>

                <p className="pt-1 text-center text-[14px] font-medium text-[#7B8C8E]">간편 회원가입</p>

                <div className="flex gap-3">
                  <SocialButton bg="#FFFFFF">
                    <GoogleIcon />
                  </SocialButton>
                  <SocialButton bg="#FEE500">
                    <KakaoIcon />
                  </SocialButton>
                  <SocialButton bg="#111111">
                    <AppleIcon />
                  </SocialButton>
                </div>
              </>
            ) : (
              <>
                <Field label="이름" placeholder="홍길동" />
                <Field label="이메일" placeholder="Moment@example.com" />
                <Field label="비밀번호" placeholder="••••••••" type="password" />
                <Field label="비밀번호 확인" placeholder="••••••••" type="password" />

                <label className="my-2 flex items-center gap-2.5 py-1.5 text-[14px] text-[#7B8C8E]">
                  <span className="h-[18px] w-[18px] rounded-[5px] border border-[#B8DADD] bg-[#F4FBFB]" />
                  이용약관 및 개인정보 처리방침에 동의합니다.
                </label>

                <button className="h-[58px] rounded-full bg-[#00ADB5] text-[16px] font-medium text-white" type="button">
                  회원가입
                </button>
              </>
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
