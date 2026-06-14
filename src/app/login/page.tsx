import { AuthShell } from "@/components/AuthShell";

export default function LoginPage() {
  return (
    <AuthShell
      chipText="Quiet · Clear · Simple"
      description="MOMENTLIT SIGN IN"
      footerHref="/signup"
      footerLead="처음이신가요?"
      footerLink="MomentLit 가입하기"
      primaryLabel="아이디와 비밀번호를 입력하고 MomentLit에 접속하세요."
      subtitle="로고의 청록빛처럼 맑고 차분한 흐름으로, 빠르게 로그인하고 바로 서비스를 시작하세요."
      title="로그인"
      variant="login"
    />
  );
}
