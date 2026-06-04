"use client";

import Image from "next/image";

const navItems = ["홈", "공간 찾기", "호스트 되기", "모임 탐색"];

export function Header() {
  return (
    <header className="border-b border-[#D7DEE2] bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-7">
        <a className="flex w-[164px] items-center gap-2" href="#">
          <Image
            src="/Logo.png"
            alt="MomentLit"
            width={56}
            height={40}
            priority
            className="h-[40px] w-[56px] object-contain"
          />
        </a>

        <nav className="flex h-16 items-center gap-9 text-[13px] font-medium text-[#303A41]">
          {navItems.map((item) => (
            <a key={item} className="transition hover:text-[#09AFC0]" href="#">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex w-[164px] items-center justify-end gap-5">
          <a
            className="rounded-full bg-[#131B22] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-normal text-white"
            href="#"
          >
            My Page
          </a>
          <button
            aria-label="알림"
            className="relative h-6 w-6 text-[#30404A] transition hover:text-[#09AFC0]"
            type="button"
          >
            <span className="absolute left-[7px] top-[5px] h-[11px] w-[10px] rounded-t-full border border-current" />
            <span className="absolute bottom-[4px] left-[10px] h-1 w-1 rounded-full bg-current" />
            <span className="absolute right-[4px] top-[2px] h-1.5 w-1.5 rounded-full bg-[#FF4E8A]" />
          </button>
          <button
            aria-label="메시지"
            className="relative h-6 w-6 text-[#30404A] transition hover:text-[#09AFC0]"
            type="button"
          >
            <span className="absolute left-[4px] top-[5px] h-[13px] w-[16px] rounded-full border border-current" />
            <span className="absolute bottom-[5px] left-[8px] h-[5px] w-[6px] rotate-[-28deg] border-b border-l border-current bg-white" />
          </button>
          <button
            aria-label="프로필"
            className="grid h-[31.5px] w-[31.5px] place-items-center rounded-full bg-[#DDE5EA] text-[12px] font-semibold text-[#56626B] shadow-sm"
            type="button"
          >
            M
          </button>
        </div>
      </div>

      <div className="border-t border-[#E5EAED]">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-center px-7">
          <form
            className="flex h-8 w-[760px] items-center rounded-full border border-[#C9DDE0] bg-white pl-8 pr-1.5"
            onSubmit={(event) => event.preventDefault()}
          >
            <span className="mr-3 rounded-full bg-[#D8FAFC] px-3 py-1 text-[10px] font-semibold text-[#06A9B8]">
              HOT PICK
            </span>
            <input
              aria-label="검색"
              className="min-w-0 flex-1 bg-transparent text-[12px] text-[#52616B] outline-none placeholder:text-[#98A6AD]"
              placeholder="공간, 취향, 키워드, 도시 모두 검색해보세요"
              type="search"
            />
            <button
              aria-label="검색"
              className="grid h-6 w-6 place-items-center rounded-full bg-[#11B7C4] text-white"
              type="submit"
            >
              <span className="relative h-3 w-3 rounded-full border border-current after:absolute after:-bottom-[3px] after:-right-[3px] after:h-[5px] after:w-px after:rotate-[-45deg] after:bg-current" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
