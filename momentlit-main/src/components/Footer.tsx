import Image from "next/image";

const footerLinks = ["이용약관", "개인정보처리방침", "고객센터"];

export function Footer() {
  return (
    <footer className="bg-[#222D37] text-white">
      <div className="mx-auto flex h-[360px] max-w-[1440px] items-center justify-between px-20">
        <div className="w-[420px]">
          <div className="mb-7 flex items-center gap-2.5">
            <h2 className="text-[22px] font-semibold tracking-normal">MomentLit</h2>
            <Image
              src="/Logo.png"
              alt=""
              width={34}
              height={24}
              className="h-6 w-[34px] object-contain brightness-0 invert grayscale"
            />
          </div>
          <p className="text-[13px] leading-7 text-[#D4DCE1]">
            MomentLit 주식회사 ㅣ 사업자등록번호 120-86-57040
            <br />
            이메일 help@momentlit.kr
            <br />
            서울시 마포구 독막로 8길 어딘가, 기억이 스며드는 순간의 플랫폼
          </p>
        </div>

        <nav className="flex w-[510px] items-start justify-between">
          <div className="flex flex-col gap-6 text-[14px] text-[#E8EEF2]">
            <a href="#">홈</a>
            <a href="#">공간 찾기</a>
            <a href="#">호스트</a>
            <a href="#">AI 공간 추천</a>
          </div>
          <div className="flex gap-3">
            {footerLinks.map((item) => (
              <a
                className="rounded-full border border-[#CAD4DA]/65 px-3 py-1 text-[11px] text-[#E8EEF2]"
                href="#"
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
