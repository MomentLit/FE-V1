"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  ACCESS_TOKEN_KEY,
  clearCachedCurrentUser,
  type CurrentUser,
  fetchCurrentUser,
  LEGACY_ACCESS_TOKEN_KEY,
} from "@/lib/current-user";

type MyPageContextValue = {
  setCurrentUser: (user: CurrentUser) => void;
  user: CurrentUser;
};

const MyPageContext = createContext<MyPageContextValue | null>(null);

const menuItems = [
  { href: "/mypage", label: "정보 수정" },
  { href: "/mypage/spaces", label: "나의 공간 및 팝업" },
  { href: "/mypage/matchings", label: "나의 매칭" },
];

function Sidebar({ user }: { user: CurrentUser }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
    clearCachedCurrentUser();
    router.push("/");
  }

  return (
    <aside className="flex w-80 shrink-0 flex-col gap-5" aria-label="마이페이지 메뉴">
      <section className="flex flex-col gap-[18px] rounded-[28px] bg-[#EEF8F8] p-6">
        <div className="relative grid h-[72px] w-[72px] place-items-center overflow-hidden rounded-full bg-[#00ADB5] text-[24px] font-bold text-white">
          {user.image_url ? (
            <Image
              src={user.image_url}
              alt={`${user.name} 프로필`}
              fill
              unoptimized
              sizes="72px"
              className="object-cover"
            />
          ) : (
            user.name.charAt(0)
          )}
        </div>
        <h1 className="text-[28px] font-bold text-[#222831]">
          {user.name} 님, 반가워요
        </h1>
      </section>

      <nav className="flex flex-col gap-2.5 rounded-[28px] bg-white p-3.5">
        <p className="px-[18px] pt-1 text-[14px] font-bold text-[#222831]">
          마이페이지 메뉴
        </p>
        {menuItems.map(({ href, label }) => {
          const active = pathname === href;

          return (
            <Link
              className={`flex w-full items-center rounded-[20px] px-[18px] py-4 text-left text-[17px] ${
                active
                  ? "bg-[#00ADB5] font-bold text-white"
                  : "bg-[#F7FBFB] font-semibold text-[#4F5D73]"
              }`}
              href={href}
              key={href}
            >
              {label}
            </Link>
          );
        })}
        <button
          className="flex w-full items-center rounded-[20px] bg-[#F7FBFB] px-[18px] py-4 text-left text-[17px] font-semibold text-[#4F5D73]"
          onClick={handleLogout}
          type="button"
        >
          로그아웃
        </button>
      </nav>
    </aside>
  );
}

export function useMyPageUser() {
  const context = useContext(MyPageContext);

  if (!context) {
    throw new Error("useMyPageUser must be used within MyPageShell.");
  }

  return context;
}

export function MyPageShell({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadCurrentUser() {
      try {
        const user = await fetchCurrentUser();

        if (active) {
          setCurrentUser(user);
        }
      } catch {
        if (active) {
          clearCachedCurrentUser();
          setProfileError("프로필 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    }

    void loadCurrentUser();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#222831]">
      <Header />
      <main className="mx-auto mt-7 flex min-h-[1404px] w-[1280px] gap-7 pb-[140px]">
        {profileLoading ? (
          <p className="w-full py-20 text-center text-[15px] text-[#5E687E]">
            프로필 정보를 불러오는 중입니다.
          </p>
        ) : profileError || !currentUser ? (
          <p
            className="w-full py-20 text-center text-[15px] text-[#B34848]"
            role="alert"
          >
            {profileError || "프로필 정보를 확인할 수 없습니다."}
          </p>
        ) : (
          <MyPageContext.Provider value={{ setCurrentUser, user: currentUser }}>
            <Sidebar user={currentUser} />
            {children}
          </MyPageContext.Provider>
        )}
      </main>
      <Footer />
    </div>
  );
}
