import { AuthShell } from "@/components/AuthShell";

export default function SignupPage() {
  return (
    <AuthShell
      chipText="Join · Build · Launch"
      description="MOMENTLIT SIGN UP"
      footerHref="/login"
      footerLead="이미 계정이 있나요?"
      footerLink="MomentLit 로그인"
      primaryLabel={"이름과 이메일, 비밀번호를 입력하고\nMomentLit 계정을 만들어보세요."}
      subtitle="브랜드의 첫 연결이 더 간단해지도록, 간편 회원가입과 기본 가입을 한 화면에 담았어요."
      title="회원가입"
      variant="signup"
    />
  );
}
