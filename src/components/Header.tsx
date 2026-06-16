"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { getAccessToken } from "@/lib/current-user";

const navItems = [
  ["홈", "top"],
  ["공간 찾기", "space-search"],
  ["캘린더", "calendar"],
  ["AI 공간 매칭", "ai-match"],
];

function ProfileIcon() {
  return (
    <span className="grid h-[31.5px] w-[31.5px] place-items-center rounded-full bg-[#99A1B1]">
      <svg aria-hidden="true" className="h-[23.625px] w-[23.625px]" viewBox="0 0 23.625 23.625">
        <path
          d="M11.671875 2.953125c-2.34721 0-4.25 1.90279-4.25 4.25s1.90279 4.25 4.25 4.25 4.25-1.90279 4.25-4.25-1.90279-4.25-4.25-4.25Zm2.50807 10.39078c-1.66153-.26517-3.3546-.26517-5.01614 0l-.1781.02843c-2.34116.37364-4.06383 2.39304-4.06383 4.76382 0 1.27963 1.03734 2.31697 2.31697 2.31697h8.86606c1.27963 0 2.31697-1.03734 2.31697-2.31697 0-2.37079-1.72267-4.39019-4.06384-4.76382l-.17809-.02843Z"
          fill="#363853"
        />
      </svg>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [profileError, setProfileError] = useState("");
  const router = useRouter();

  const activeNav =
    pathname === "/"
      ? "홈"
      : pathname.startsWith("/space-search") ||
          pathname.startsWith("/popup-detail") ||
          pathname.startsWith("/spaces/space_detail")
        ? "공간 찾기"
        : pathname.startsWith("/calendar")
          ? "캘린더"
          : "";

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("name") ?? "").trim();

    router.push(
      query ? `/space-search?name=${encodeURIComponent(query)}` : "/space-search",
    );
  }

  function handleProfileClick() {
    setProfileError("");

    if (!getAccessToken()) {
      setProfileError("로그인 정보를 확인해주세요.");
      return;
    }

    router.push("/mypage");
  }

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 min-[1181px]:px-7">
        <div className="flex w-[163.5px] items-center">
          <Image
            src="/Logo.png"
            alt="MomentLit"
            width={56}
            height={40}
            priority
            className="h-10 w-14 object-contain"
          />
        </div>

        <nav className="flex h-16 items-center gap-2 text-[18px] font-semibold leading-[1.3] text-[#67728A]">
          {navItems.map(([item]) => {
            const active = item === activeNav;
            const targetHref =
              item === "홈"
                ? "/"
                : item === "공간 찾기"
                  ? "/space-search"
                  : item === "캘린더"
                    ? "/calendar"
                    : "/#ai-match";

            return (
              <Link
                className={`grid h-16 place-items-center rounded-full px-[18px] transition ${
                  active
                    ? "bg-[#00ADB5]/[0.07] text-[#00ADB5]"
                    : "hover:text-[#00ADB5]"
                }`}
                key={item}
                href={targetHref}
              >
                {item}
              </Link>
            );
          })}
        </nav>

        <div className="flex w-[163.5px] items-center justify-end gap-5">
          <Link
            className="rounded-full bg-[#222831] px-3.5 py-2 text-[12px] font-bold text-white"
            href="/mypage"
          >
            MY PICK
          </Link>
          <button
            aria-label="알림"
            type="button"
          >
            <Image
              src="/bell.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
          <button
            aria-label="메시지"
            type="button"
          >
            <Image
              src="/plain.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
          <button
            aria-label="프로필"
            aria-describedby={profileError ? "profile-error" : undefined}
            onClick={handleProfileClick}
            type="button"
          >
            <ProfileIcon />
          </button>
          {profileError ? (
            <span className="sr-only" id="profile-error" role="alert">
              {profileError}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex h-16 items-start justify-center bg-white px-7 pb-2">
        <form
          className="flex w-[760px] items-center gap-[14.4px] rounded-[90px] bg-[#F7FBFB] py-2 pl-[18px] pr-2"
          onSubmit={handleSearch}
        >
          <span className="rounded-full bg-[#00ADB5]/[0.08] px-3.5 py-2 text-[13px] font-bold text-[#00ADB5]">
            HOT 키워드
          </span>
          <input
            aria-label="검색"
            className="h-8 w-[560px] bg-transparent text-[16px] font-medium text-[#67728A] outline-none placeholder:text-[#67728A]"
            name="name"
            placeholder="성수 팝업, 캐릭터 전시, 부산 로컬 마켓처럼 검색해보세요."
            type="search"
          />
          <button
            aria-label="검색"
            className="grid h-8 w-8 place-items-center"
            type="submit"
          >
            <Image
              src="/search.svg"
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </button>
        </form>
      </div>
    </header>
  );
}
