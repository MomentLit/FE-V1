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

const spaceStats = [
  {
    label: "운영 중 공간",
    value: "04",
    detail: "이번 주 신규 저장 128회",
    featured: true,
  },
  {
    label: "예정된 팝업",
    value: "07",
    detail: "가장 가까운 일정 5월 18일",
  },
  {
    label: "새 문의",
    value: "12",
    detail: "답변 대기 3건",
  },
];

const spaces = [
  {
    title: "성수 쇼룸 A",
    description: "브랜드 팝업 · 서울 성동구 · 최대 80명",
    status: "운영 중",
    detail: "다음 예약 가능일 5월 14일 · 최근 문의 4건",
    action: "수정하기",
  },
  {
    title: "연남 팝업 라운지",
    description: "단기 행사 공간 · 서울 마포구 · 최대 45명",
    status: "검수 중",
    detail: "대표 이미지 교체 요청 반영 중 · 승인 대기 1건",
    action: "상세 관리",
  },
  {
    title: "한남 브랜드 전시 팝업",
    description: "예정된 팝업 · 서울 용산구 · 2026.05.22 - 2026.06.03",
    status: "모집 중",
    detail: "관심 저장 342회 · 공유 클릭 57회 · 문의 7건",
    action: "수정하기",
  },
];

function getStatusClass(status: string) {
  switch (status) {
    case "운영 중":
      return "bg-[#E8F6F7] text-[#008992]";
    case "검수 중":
      return "bg-[#FFF4DE] text-[#C88700]";
    case "모집 중":
      return "bg-[#EAF7EA] text-[#2D8A57]";
    default:
      return "bg-[#F1F5F6] text-[#4F5D73]";
  }
}

function MySpaces() {
  return (
    <section className="flex w-[932px] flex-col gap-6">
      <div className="flex flex-col gap-2.5 pb-1">
        <p className="text-[12px] font-medium text-[#00ADB5]">
          MOMENTLIT MY PAGE
        </p>
        <h2 className="text-[42px] font-bold text-[#222831]">
          나의 공간 및 팝업
        </h2>
      </div>

      <section className="flex flex-col gap-6 rounded-[30px] bg-white p-7">
        <h3 className="text-[30px] font-bold text-[#222831]">
          등록된 공간 &amp; 팝업
        </h3>
        <p className="text-[15px] font-medium text-[#5E687E]">
          운영 중인 공간과 예정된 팝업 일정을 한 카드 안에서 확인하고, 수정이나
          노출 관리까지 바로 이어질 수 있도록 구성했습니다.
        </p>

        <div className="flex gap-4">
          {spaceStats.map(({ detail, featured, label, value }) => (
            <article
              className={`flex w-[260px] flex-col gap-2 rounded-3xl p-[22px] ${
                featured ? "bg-[#EEF8F8]" : "bg-[#F7FBFB]"
              }`}
              key={label}
            >
              <p className="text-[14px] font-semibold text-[#5E687E]">
                {label}
              </p>
              <strong className="text-[34px] font-bold text-[#222831]">
                {value}
              </strong>
              <p className="text-[13px] font-medium text-[#00ADB5]">
                {detail}
              </p>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-[24px] font-bold text-[#222831]">
            내 공간 리스트
          </h4>
          <button
            className="rounded-full bg-[#E8F6F7] px-4 py-2.5 text-[13px] font-bold text-[#008992]"
            type="button"
          >
            새 공간 등록
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          {spaces.map(
            ({
              action,
              description,
              detail,
              status,
              title,
            }) => (
              <article
                className="flex flex-col gap-3 rounded-3xl border border-[#DDEEEF] bg-[#F8FBFB] p-[22px]"
                key={title}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1.5">
                    <h5 className="text-[22px] font-bold text-[#222831]">
                      {title}
                    </h5>
                    <p className="text-[14px] font-medium text-[#5E687E]">
                      {description}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3.5 py-2 text-[13px] font-bold ${getStatusClass(status)}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-medium text-[#5E687E]">
                    {detail}
                  </p>
                  <div className="flex gap-2.5">
                    <button
                      className="rounded-full bg-[#F1F5F6] px-4 py-2.5 text-[13px] font-bold text-[#4F5D73]"
                      type="button"
                    >
                      삭제하기
                    </button>
                    <button
                      className="rounded-full bg-[#00ADB5] px-4 py-2.5 text-[13px] font-bold text-white"
                      type="button"
                    >
                      {action}
                    </button>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </section>
    </section>
  );
}

const matchingStats = [
  { label: "받은 요청", value: "8", valueClass: "text-[#00ADB5]" },
  { label: "검토 대기", value: "3", valueClass: "text-[#C56A00]" },
  { label: "확정 매칭", value: "5", valueClass: "text-[#12A66A]" },
];

const matchingRequests = [
  {
    popup: "캐릭터 문구 팝업",
    applicant: "김하린",
    space: "성수 아트 라운지",
    date: "05.28",
  },
  {
    popup: "로컬 디저트 마켓",
    applicant: "박도윤",
    space: "연남 포토 살롱",
    date: "05.27",
  },
  {
    popup: "신진 작가 전시",
    applicant: "이서연",
    space: "전포 카페 갤러리",
    date: "05.26",
  },
  {
    popup: "뷰티 체험 부스",
    applicant: "최유민",
    space: "해운대 루프 스튜디오",
    date: "05.25",
  },
];

function MyMatching() {
  const [selectedFilter, setSelectedFilter] = useState("전체");

  return (
    <section className="flex w-[932px] flex-col gap-6">
      <div className="flex flex-col gap-2.5 pb-1">
        <p className="text-[14px] font-bold text-[#00ADB5]">
          MOMENTLIT MATCHING
        </p>
        <h2 className="text-[42px] font-bold text-[#222831]">
          받은 매칭 요청
        </h2>
        <p className="w-[760px] text-[18px] font-medium text-[#5E687E]">
          팝업 운영자가 내 공간에 보낸 매칭 요청을 확인하고 수락 또는 거절할 수
          있어요.
        </p>
      </div>

      <div className="flex gap-4">
        {matchingStats.map(({ label, value, valueClass }) => (
          <article
            className="flex flex-1 flex-col gap-2 rounded-3xl border border-[#DDEEEF] bg-white p-[22px]"
            key={label}
          >
            <p className="text-[14px] font-bold text-[#5E687E]">{label}</p>
            <strong className={`text-[34px] font-bold ${valueClass}`}>
              {value}
            </strong>
          </article>
        ))}
      </div>

      <section className="flex flex-col gap-5 rounded-[30px] border border-[#DDEEEF] bg-white p-7">
        <div className="flex items-center justify-between">
          <div className="flex w-[520px] flex-col gap-1.5">
            <h3 className="text-[26px] font-bold text-[#222831]">
              받은 요청 목록
            </h3>
            <p className="text-[15px] font-medium text-[#5E687E]">
              총 8개의 요청 중 검토 대기 3개가 있어요.
            </p>
          </div>
          <div className="flex gap-2.5">
            {["전체", "대기", "확정"].map((filter) => {
              const active = filter === selectedFilter;

              return (
                <button
                  className={`rounded-full px-3 py-2 text-[13px] font-bold ${
                    active
                      ? "bg-[#E8F6F7] text-[#00ADB5]"
                      : "bg-[#F3F7F7] text-[#5E687E]"
                  }`}
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-[#DDEEEF]">
          <div className="grid h-14 grid-cols-[270px_130px_210px_110px_156px] bg-[#EEF8F8] text-[13px] font-bold text-[#5E687E]">
            {["팝업", "신청자", "희망 공간", "요청일", "검토"].map(
              (heading) => (
                <div className="flex items-center px-4" key={heading}>
                  {heading}
                </div>
              ),
            )}
          </div>

          {matchingRequests.map(({ applicant, date, popup, space }) => (
            <article
              className="grid h-[82px] grid-cols-[270px_130px_210px_110px_156px] border-b border-[#EEF1F1] bg-white text-[14px] text-[#222831] last:border-b-0"
              key={popup}
            >
              <div className="flex items-center px-4 font-bold">{popup}</div>
              <div className="flex items-center px-4 font-semibold">
                {applicant}
              </div>
              <div className="flex items-center px-4 font-semibold">
                {space}
              </div>
              <div className="flex items-center px-4 font-semibold">{date}</div>
              <div className="flex items-center gap-2 px-4">
                <button
                  className="rounded-full bg-[#00ADB5] px-3.5 py-2.5 text-[14px] font-bold text-white"
                  type="button"
                >
                  수락
                </button>
                <button
                  className="rounded-full border border-[#DDEEEF] bg-[#F3F7F7] px-3.5 py-2.5 text-[14px] font-bold text-[#5E687E]"
                  type="button"
                >
                  거절
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
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
        {selectedIndex === 1 ? <MySpaces /> : null}
        {selectedIndex === 2 ? <MyMatching /> : null}
      </main>
      <Footer />
    </div>
  );
}
