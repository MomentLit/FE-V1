import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const dynamic = "force-dynamic";

const filterRegions = [
  ["성수", true],
  ["연남", false],
  ["한남", false],
  ["부산", false],
  ["강남", false],
  ["기타", false],
  ["성수2가", false],
  ["을지로", false],
  ["해운대", false],
];

const filterTypes = [
  ["팝업", true],
  ["전시", false],
  ["쇼룸", false],
  ["촬영", false],
  ["클래스", false],
  ["모임", false],
  ["F&B", false],
];

const capacityOptions = [
  ["20명 이하", false],
  ["20-50명", true],
  ["50-100명", false],
  ["100명 이상", false],
];

const priceOptions = [
  ["30만원 이하", false],
  ["50만원 이하", true],
  ["100만원 이하", true],
  ["협의", true],
];

const resultCards = [
  {
    title: "성수 아트 라운지",
    meta: "서울 성동구 · 최대 80명",
    image:
      "https://images.unsplash.com/photo-1759730840961-09faa5731a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["브랜드 팝업", "전시", "촬영"],
    price: "120만원 / 일",
    capacity: "잔여 일정 3개",
    views: "2.3k",
    likes: "318",
    highlight: true,
    href: "/spaces/space_detail",
  },
  {
    title: "연남 포토 살롱",
    meta: "서울 마포구 · 최대 45명",
    image:
      "https://images.unsplash.com/photo-1671521867046-e6d7ad644094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["전시", "촬영", "쇼룸"],
    price: "78만원 / 일",
    capacity: "잔여 일정 5개",
    views: "1.8k",
    likes: "247",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "서촌 로컬 하우스",
    meta: "서울 종로구 · 최대 35명",
    image:
      "https://images.unsplash.com/photo-1774021802030-d4b48399232d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["클래스", "촬영", "모임"],
    price: "55만원 / 일",
    capacity: "잔여 일정 7개",
    views: "1.2k",
    likes: "192",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "성수 팝업 플로어",
    meta: "서울 성동구 · 최대 70명",
    image:
      "https://images.unsplash.com/photo-1771402382398-7210f67eb41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["팝업", "전시", "체험형"],
    price: "130만원 / 일",
    capacity: "잔여 일정 3개",
    views: "1.5k",
    likes: "264",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "홍대 크리에이터 룸",
    meta: "서울 마포구 · 최대 40명",
    image:
      "https://images.unsplash.com/photo-1774384412702-970b89bae264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["촬영", "모임", "쇼룸"],
    price: "78만원 / 일",
    capacity: "잔여 일정 5개",
    views: "1.0k",
    likes: "118",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "광안리 오션 갤러리",
    meta: "부산 수영구 · 최대 65명",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    tags: ["전시", "브랜드 팝업", "야경"],
    price: "125만원 / 일",
    capacity: "잔여 일정 2개",
    views: "1.4k",
    likes: "156",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "연희 아트룸",
    meta: "서울 서대문구 · 최대 32명",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    tags: ["클래스", "전시", "모임"],
    price: "58만원 / 일",
    capacity: "잔여 일정 6개",
    views: "930",
    likes: "104",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "서면 팝업 스튜디오",
    meta: "부산 부산진구 · 최대 55명",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    tags: ["팝업", "촬영", "체험형"],
    price: "88만원 / 일",
    capacity: "잔여 일정 4개",
    views: "1.1k",
    likes: "133",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "성수 포트폴리오 스페이스",
    meta: "서울 성동구 · 최대 80명",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    tags: ["브랜드 팝업", "전시", "쇼룸"],
    price: "150만원 / 일",
    capacity: "잔여 일정 3개",
    views: "2.1k",
    likes: "287",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "을지로 루프 하우스",
    meta: "서울 중구 · 최대 60명",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    tags: ["전시", "모임", "촬영"],
    price: "96만원 / 일",
    capacity: "잔여 일정 4개",
    views: "1.3k",
    likes: "166",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "한남 브랜드 라운지",
    meta: "서울 용산구 · 최대 90명",
    image:
      "https://images.unsplash.com/photo-1514894780887-121968d00567?auto=format&fit=crop&w=1200&q=80",
    tags: ["팝업", "전시", "촬영"],
    price: "190만원 / 일",
    capacity: "잔여 일정 1개",
    views: "864",
    likes: "49",
    highlight: false,
    href: "/spaces/space_detail",
  },
  {
    title: "해운대 뷰 이벤트홀",
    meta: "부산 해운대구 · 최대 90명",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    tags: ["행사", "루프탑", "대관 가능"],
    price: "170만원 / 일",
    capacity: "잔여 일정 2개",
    views: "1.4k",
    likes: "95",
    highlight: false,
    href: "/spaces/space_detail",
  },
];

function SearchCard({
  image,
  likes,
  meta,
  tags,
  title,
  views,
  price,
  capacity,
  highlight,
  href,
}: {
  image: string;
  likes: string;
  meta: string;
  tags: string[];
  title: string;
  views: string;
  price: string;
  capacity: string;
  highlight?: boolean;
  href: string;
}) {
  return (
    <Link className="block w-[306px]" href={href}>
      <article className="flex h-full flex-col rounded-[24px] border border-[#DDEEEF] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,29,36,0.08)]">
        <div className="relative h-[152px] overflow-hidden rounded-[18px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="306px"
            className="object-cover"
          />
          {highlight ? (
            <span className="absolute right-2 top-2 z-10 text-[14px] leading-none text-[#FF4E8A]">
              ♥
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <h3 className="text-[18px] font-bold leading-[1.34] text-[#222831]">
            {title}
          </h3>
          <p className="text-[13px] font-medium text-[#67728A]">{meta}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              className={`rounded-full px-[14px] py-[10px] text-[14px] ${
                index === 0
                  ? "border border-[#BFECEE] bg-[#E8F6F7] font-bold text-[#00ADB5]"
                  : "border border-[#DDEEEF] bg-[#F8FBFB] font-medium text-[#67728A]"
              }`}
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-bold text-[#222831]">{price}</span>
            <span className="text-[12px] font-medium text-[#67728A]">
              {capacity}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] leading-none text-[#8A94A6]">👁</span>
              <span className="text-[12px] font-bold text-[#5E687E]">{views}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold text-[#5E687E]">{likes}</span>
              <button
                className="grid h-7 w-7 place-items-center rounded-full border border-[#DDEEEF] bg-[#F8FBFB] text-[12px] font-bold text-[#FF6B81]"
                type="button"
              >
                ♡
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function FilterPill({
  active,
  label,
}: {
  active?: boolean;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[12px] px-[12px] py-2 text-[13px] ${
        active
          ? "border border-[#BFECEE] bg-[#E6F7F8] font-bold text-[#00ADB5]"
          : "border border-[#D0D3DB] bg-white font-medium text-[#67728A]"
      }`}
    >
      {label}
    </span>
  );
}

function FilterSection({
  children,
  title,
  linkLabel = "전체 보기",
}: {
  children: ReactNode;
  title: string;
  linkLabel?: string;
}) {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-[#222831]">{title}</h3>
        <button className="text-[12px] font-bold text-[#00ADB5]" type="button">
          {linkLabel}
        </button>
      </div>
      {children}
    </section>
  );
}

export default function SpaceSearchPage() {
  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#172129]">
      <Header />

      <main className="mx-auto flex w-[1440px] flex-col gap-6 px-20 pb-[140px] pt-7">
        <section className="flex flex-col gap-[14px]">
          <p className="text-[12px] font-bold text-[#00ADB5]">
            MOMENTLIT SPACE SEARCH
          </p>
          <h1 className="text-[42px] font-bold leading-[1.4] text-[#222831]">
            공간 찾기
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-[24px] border border-[#DDEEEF] bg-white px-[18px] py-4">
              <span className="grid h-4 w-4 rounded-[4px] bg-[#67728A]" />
              <input
                aria-label="검색"
                className="w-full bg-transparent text-[14px] font-medium text-[#67728A] outline-none placeholder:text-[#67728A]"
                placeholder="공간명, 지역, 용도"
                type="search"
              />
            </div>
            <button
              className="rounded-[24px] bg-[#00ADB5] px-6 py-4 text-[14px] font-bold text-white"
              type="button"
            >
              검색
            </button>
          </div>
        </section>

        <section className="flex items-start gap-6">
          <aside className="w-[304px] rounded-[28px] border border-[#DDEEEF] bg-white p-6">
            <div className="flex flex-col gap-[18px]">
              <h2 className="text-[22px] font-bold text-[#222831]">필터</h2>

              <FilterSection title="키워드" linkLabel="">
                <div className="flex items-center gap-2 rounded-[20px] border border-[#DDEEEF] bg-[#F8FBFB] px-4 py-[14px]">
                  <span className="h-4 w-4 rounded bg-[#67728A]" />
                  <span className="text-[14px] font-medium text-[#67728A]">
                    공간명, 지역, 용도
                  </span>
                </div>
              </FilterSection>

              <FilterSection title="지역">
                <div className="flex flex-wrap gap-2">
                  {filterRegions.map(([label, active]) => (
                    <FilterPill active={active} key={label} label={label} />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="유형">
                <div className="flex flex-wrap gap-2">
                  {filterTypes.map(([label, active]) => (
                    <FilterPill active={active} key={label} label={label} />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="수용 인원" linkLabel="">
                <div className="flex flex-wrap gap-2">
                  {capacityOptions.map(([label, active]) => (
                    <span
                      className={`rounded-full border px-[14px] py-[10px] text-[14px] ${
                        active
                          ? "border-[#DDEEEF] bg-[#E8F6F7] font-bold text-[#00ADB5]"
                          : "border-[#DDEEEF] bg-[#F8FBFB] font-medium text-[#67728A]"
                      }`}
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="가격" linkLabel="">
                <div className="flex flex-wrap gap-2">
                  {priceOptions.map(([label, active]) => (
                    <span
                      className={`rounded-[12px] border px-[12px] py-2 text-[13px] ${
                        active
                          ? "border-[#D0D3DB] bg-[#E6F7F8] font-bold text-[#00ADB5]"
                          : "border-[#D0D3DB] bg-white font-medium text-[#67728A]"
                      }`}
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </FilterSection>

              <div className="mt-2 flex gap-2">
                <button
                  className="flex-1 rounded-[16px] border border-[#DDEEEF] bg-[#F8FBFB] px-4 py-3 text-[14px] font-bold text-[#5E687E]"
                  type="button"
                >
                  초기화
                </button>
                <button
                  className="flex-1 rounded-[16px] bg-[#222831] px-4 py-3 text-[14px] font-bold text-white"
                  type="button"
                >
                  적용
                </button>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[24px] font-bold text-[#222831]">
                추천 공간
              </h2>
              <div className="flex gap-2">
                {["추천순", "최신순", "가격 낮은순", "리뷰 많은순"].map(
                  (label, index) => (
                    <FilterPill active={index === 0} key={label} label={label} />
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {resultCards.map((card) => (
                <SearchCard key={card.title} {...card} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#D0D3DB] bg-white text-[16px] font-bold text-[#67728A]"
                type="button"
              >
                ‹
              </button>
              <button className="grid h-8 w-9 place-items-center rounded-[10px] bg-[#00ADB5] text-[13px] font-bold text-white" type="button">
                1
              </button>
              <button
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#D0D3DB] bg-white text-[13px] font-semibold text-[#67728A]"
                type="button"
              >
                2
              </button>
              <button
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#D0D3DB] bg-white text-[13px] font-semibold text-[#67728A]"
                type="button"
              >
                3
              </button>
              <span className="grid h-8 w-6 place-items-center text-[16px] font-semibold text-[#99A1B1]">
                …
              </span>
              <button
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#D0D3DB] bg-white text-[13px] font-semibold text-[#67728A]"
                type="button"
              >
                8
              </button>
              <button
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#D0D3DB] bg-white text-[16px] font-bold text-[#67728A]"
                type="button"
              >
                ›
              </button>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
