"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const menuItems = [
  "정보 수정",
  "나의 공간 및 팝업",
  "나의 매칭",
  "로그아웃",
];

function Sidebar({
  selectedIndex,
  setSelectedIndex,
}: {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}) {
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
        {menuItems.map((label, index) => {
          const active = index === selectedIndex;

          return (
            <button
              className={`flex w-full items-center rounded-[20px] px-[18px] py-4 text-left text-[17px] ${
                active
                  ? "bg-[#00ADB5] font-bold text-white"
                  : "bg-[#F7FBFB] font-semibold text-[#4F5D73]"
              }`}
              key={label}
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

const profileFields = [
  { id: "name", label: "이름", value: "홍길동", type: "text" },
  {
    id: "email",
    label: "이메일",
    value: "momentlit@brand.com",
    type: "email",
  },
  {
    id: "phone",
    label: "연락처",
    value: "010-1234-5678",
    type: "tel",
  },
  {
    id: "brand",
    label: "브랜드/활동명",
    value: "MomentLit Studio",
    type: "text",
  },
];

function ProfileEdit() {
  return (
    <section className="flex w-[932px] flex-col gap-6">
      <div className="flex flex-col gap-2.5 pb-1">
        <p className="text-[12px] font-medium text-[#00ADB5]">
          MOMENTLIT MY PAGE
        </p>
        <h2 className="text-[42px] font-bold text-[#222831]">정보 수정</h2>
      </div>

      <form className="flex flex-col gap-6 rounded-[30px] bg-white p-7">
        <h3 className="text-[30px] font-bold text-[#222831]">
          프로필 기본 정보
        </h3>
        <p className="text-[15px] font-medium text-[#5E687E]">
          사이드바의 다른 메뉴를 누르면 이 영역이 일정, 매칭, 공간 및 팝업 관리
          화면으로 전환되는 구조를 기준으로 디자인했습니다.
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {profileFields.map(({ id, label, type, value }) => (
            <label className="flex flex-col gap-2" htmlFor={id} key={id}>
              <span className="text-[14px] font-medium text-[#111111]">
                {label}
              </span>
              <input
                className="h-[52px] rounded-2xl border border-[#C8E4E6] bg-white px-[18px] text-[15px] text-[#666666] outline-none transition focus:border-[#00ADB5]"
                defaultValue={value}
                id={id}
                type={type}
              />
            </label>
          ))}
        </div>

        <label className="flex flex-col gap-2" htmlFor="introduction">
          <span className="text-[14px] font-medium text-[#222831]">
            소개 문구
          </span>
          <textarea
            className="h-36 resize-none rounded-[20px] border border-[#C8E4E6] bg-[#F8FBFB] p-[18px] text-[15px] font-medium text-[#4F5D73] outline-none transition focus:border-[#00ADB5]"
            defaultValue="브랜드와 공간 큐레이션을 함께 기획하며, 시즌 팝업과 전시 프로젝트를 주로 운영하고 있습니다."
            id="introduction"
          />
        </label>

        <div className="flex justify-end gap-3">
          <button
            className="h-14 w-[180px] rounded-full bg-[#F3F7F7] text-[15px] font-medium text-[#4F5D73]"
            type="button"
          >
            취소
          </button>
          <button
            className="h-14 w-[220px] rounded-full bg-[#00ADB5] text-[15px] font-medium text-white"
            type="submit"
          >
            저장하기
          </button>
        </div>
      </form>
    </section>
  );
}

export default function MyPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#222831]">
      <Header />
      <main className="mx-auto mt-7 flex min-h-[1404px] w-[1280px] gap-7 pb-[140px]">
        <Sidebar
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        {selectedIndex === 0 ? <ProfileEdit /> : null}
      </main>
      <Footer />
    </div>
  );
}
