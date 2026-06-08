import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const menuItems = [
  { label: "정보 수정", active: true },
  { label: "나의 공간 및 팝업", active: false },
  { label: "나의 매칭", active: false },
  { label: "로그아웃", active: false },
];

function Sidebar() {
  return (
    <aside className="flex w-80 flex-col gap-5" aria-label="마이페이지 메뉴">
      <section className="flex flex-col gap-[18px] rounded-[28px] bg-[#EEF8F8] p-6">
        <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-[#00ADB5] text-[24px] font-bold text-white">
          홍
        </div>
        <h1 className="text-[28px] font-bold text-[#222831]">
          홍길동 님, 반가워요
        </h1>
      </section>

      <nav className="flex flex-col gap-2.5 rounded-[28px] bg-white p-3.5">
        <p className="px-[18px] pt-1 text-[14px] font-bold text-[#222831]">
          마이페이지 메뉴
        </p>
        {menuItems.map(({ active, label }) => (
          <button
            className={`flex w-full items-center rounded-[20px] px-[18px] py-4 text-left text-[17px] ${
              active
                ? "bg-[#00ADB5] font-bold text-white"
                : "bg-[#F7FBFB] font-semibold text-[#4F5D73]"
            }`}
            key={label}
            type="button"
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default function MyPage() {
  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#222831]">
      <Header />
      <main className="mx-auto mt-7 flex w-[1280px] gap-7 pb-[140px]">
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
}
