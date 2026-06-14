/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const dynamic = "force-dynamic";

const API_BASE =
  process.env.SPACES_API_BASE ??
  process.env.NEXT_PUBLIC_SPACES_API_BASE ??
  "https://mo-cf9d6bcf89cc455c9db26605b8ccfcdb.ecs.ap-northeast-2.on.aws";

const filterRegions: Array<[string, boolean]> = [
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

const filterTypes = ["팝업", "전시", "쇼룸", "촬영", "클래스", "모임", "F&B"];

const capacityOptions: Array<[string, boolean]> = [
  ["20명 이하", false],
  ["20-50명", true],
  ["50-100명", false],
  ["100명 이상", false],
];

const priceOptions: Array<[string, boolean]> = [
  ["30만원 이하", false],
  ["50만원 이하", true],
  ["100만원 이하", true],
  ["협의", true],
];

type Space = {
  space_id: number;
  name: string;
  address: string;
  thumbnail_url: string | null;
  price_per_hour: number;
  category: string;
  description?: string | null;
  ai_summary?: string | null;
};

type SpacesResponse = {
  message: string;
  data?: {
    spaces?: Space[];
  };
};

async function getSpaces(name?: string, category?: string): Promise<Space[]> {
  const baseUrl = API_BASE.replace(/\/$/, "");
  const url = new URL("/spaces", baseUrl);

  if (name?.trim()) {
    url.searchParams.set("name", name.trim());
  }

  if (category?.trim()) {
    url.searchParams.set("category", category.trim());
  }

  try {
    const response = await axios.get<SpacesResponse>(url.toString(), {
      headers: {
        Accept: "application/json",
      },
      timeout: 5000,
    });

    return Array.isArray(response.data?.data?.spaces)
      ? response.data.data.spaces
      : [];
  } catch {
    return [];
  }
}

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ko-KR").format(price)}원/시간`;
}

function buildSearchHref({
  category,
  name,
}: {
  category?: string;
  name?: string;
}) {
  const params = new URLSearchParams();

  if (name?.trim()) {
    params.set("name", name.trim());
  }

  if (category?.trim()) {
    params.set("category", category.trim());
  }

  const query = params.toString();

  return query ? `/space-search?${query}` : "/space-search";
}

function SearchCard({ space }: { space: Space }) {
  const imageUrl = space.thumbnail_url ?? "";
  const detailHref = `/popup-detail?spaceId=${space.space_id}`;

  return (
    <Link className="block w-[306px]" href={detailHref}>
      <article className="flex h-full flex-col rounded-[24px] border border-[#DDEEEF] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,29,36,0.08)]">
        <div className="relative h-[152px] overflow-hidden rounded-[18px] bg-[#EEF1F3]">
          {imageUrl ? (
            <img
              alt={space.name}
              className="h-full w-full object-cover"
              src={imageUrl}
            />
          ) : null}
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <h3 className="text-[18px] font-bold leading-[1.34] text-[#222831]">
            {space.name}
          </h3>
          <p className="text-[13px] font-medium text-[#67728A]">
            {space.address}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#BFECEE] bg-[#E8F6F7] px-[14px] py-[10px] text-[14px] font-bold text-[#00ADB5]">
            {space.category}
          </span>
          {space.description ? (
            <span className="rounded-full border border-[#DDEEEF] bg-[#F8FBFB] px-[14px] py-[10px] text-[14px] font-medium text-[#67728A]">
              상세 설명
            </span>
          ) : null}
        </div>

        <p className="mt-3 min-h-[42px] text-[13px] font-medium leading-[1.5] text-[#67728A]">
          {space.ai_summary ?? space.description ?? "공간 상세 정보를 확인해보세요."}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-bold text-[#222831]">
              {formatPrice(space.price_per_hour)}
            </span>
            <span className="text-[12px] font-medium text-[#67728A]">
              공간 ID {space.space_id}
            </span>
          </div>

          <span className="rounded-[12px] border border-[#D0D3DB] bg-white px-3 py-2 text-[13px] font-semibold text-[#67728A]">
            상세 보기
          </span>
        </div>
      </article>
    </Link>
  );
}

function FilterPill({
  active,
  label,
  href,
}: {
  active?: boolean;
  label: string;
  href?: string;
}) {
  const className = `inline-flex items-center justify-center rounded-[12px] px-[12px] py-2 text-[13px] ${
    active
      ? "border border-[#BFECEE] bg-[#E6F7F8] font-bold text-[#00ADB5]"
      : "border border-[#D0D3DB] bg-white font-medium text-[#67728A]"
  }`;

  if (href) {
    return (
      <Link className={className} href={href}>
        {label}
      </Link>
    );
  }

  return <span className={className}>{label}</span>;
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
        {linkLabel ? (
          <button className="text-[12px] font-bold text-[#00ADB5]" type="button">
            {linkLabel}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

type PageProps = {
  searchParams: Promise<{
    name?: string;
    category?: string;
  }>;
};

export default async function SpaceSearchPage({ searchParams }: PageProps) {
  const { name = "", category = "" } = await searchParams;
  const spaces = await getSpaces(name, category);

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
          <form
            action="/space-search"
            method="get"
            className="flex items-center gap-3"
          >
            <div className="flex flex-1 items-center gap-2 rounded-[24px] border border-[#DDEEEF] bg-white px-[18px] py-4">
              <span className="grid h-4 w-4 rounded-[4px] bg-[#67728A]" />
              <input
                aria-label="검색"
                className="w-full bg-transparent text-[14px] font-medium text-[#67728A] outline-none placeholder:text-[#67728A]"
                defaultValue={name}
                name="name"
                placeholder="공간명, 지역, 용도"
                type="search"
              />
            </div>
            <button
              className="rounded-[24px] bg-[#00ADB5] px-6 py-4 text-[14px] font-bold text-white"
              type="submit"
            >
              검색
            </button>
          </form>
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
                  {filterTypes.map((label) => (
                    <FilterPill
                      active={category === label}
                      href={buildSearchHref({ category: label, name })}
                      key={label}
                      label={label}
                    />
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

            {spaces.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {spaces.map((space) => (
                  <SearchCard key={space.space_id} space={space} />
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-[#DDEEEF] bg-white px-6 py-10 text-center text-[14px] font-medium text-[#67728A]">
                조건에 맞는 공간이 없어요. 검색어를 바꾸거나 필터를 조정해보세요.
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#D0D3DB] bg-white text-[16px] font-bold text-[#67728A]"
                type="button"
              >
                ‹
              </button>
              <button
                className="grid h-8 w-9 place-items-center rounded-[10px] bg-[#00ADB5] text-[13px] font-bold text-white"
                type="button"
              >
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
