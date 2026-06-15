/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const dynamic = "force-dynamic";

const API_BASE =
  process.env.SPACES_API_BASE ??
  process.env.NEXT_PUBLIC_SPACES_API_BASE;

type SpaceDetail = {
  space_id: number;
  name: string;
  description: string;
  ai_summary: string;
  address: string;
  thumbnail_url: string;
  image_urls: string[];
  price_per_hour: number;
  category: string;
};

type SpaceDetailResponse = {
  message: string;
  data?: SpaceDetail;
};

async function getSpaceDetail(spaceId: string): Promise<SpaceDetail | null> {
  if (!API_BASE) {
    return null;
  }

  const baseUrl = API_BASE.replace(/\/$/, "");
  const url = new URL(`/spaces/${spaceId}`, baseUrl);

  try {
    const response = await axios.get<SpaceDetailResponse>(url.toString(), {
      headers: {
        Accept: "application/json",
      },
      timeout: 5000,
    });

    return response.data?.data ?? null;
  } catch {
    return null;
  }
}

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ko-KR").format(price)}원/시간`;
}

function SummaryCard({ space }: { space: SpaceDetail }) {
  return (
    <section className="flex flex-col gap-[18px] rounded-[28px] border border-[#DDEEEF] bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex w-fit rounded-full bg-[#E8F6F7] px-[14px] py-[10px] text-[14px] font-bold text-[#00ADB5]">
          {space.category}
        </span>
        <span className="text-[14px] font-bold text-[#5E687E]">
          {formatPrice(space.price_per_hour)}
        </span>
      </div>

      <h2 className="w-full text-[32px] font-bold leading-[1.4] text-[#222831]">
        {space.name}
      </h2>

      <div className="flex flex-col gap-2 rounded-[20px] border border-[#DDEEEF] bg-[#F8FBFB] p-[18px]">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[14px] font-bold text-[#67728A]">주소</span>
          <span className="text-right text-[14px] font-semibold text-[#222831]">
            {space.address}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[14px] font-bold text-[#67728A]">공간 ID</span>
          <span className="text-[14px] font-semibold text-[#222831]">
            {space.space_id}
          </span>
        </div>
      </div>
    </section>
  );
}

function ConnectedSpaceCard({ space }: { space: SpaceDetail }) {
  const imageUrl = space.thumbnail_url || space.image_urls?.[0] || "";

  return (
    <section className="flex flex-col gap-4 rounded-[28px] border border-[#DDEEEF] bg-white p-6">
      <h3 className="text-[22px] font-bold leading-[1.4] text-[#222831]">
        공간 정보
      </h3>

      <article className="flex flex-col gap-3 rounded-[24px] border border-[#DDEEEF] bg-white p-4">
        <div className="relative h-[152px] w-full overflow-hidden rounded-[18px] bg-[#EEF1F3]">
          {imageUrl ? (
            <img
              alt={space.name}
              className="h-full w-full object-cover"
              src={imageUrl}
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-[18px] font-bold text-[#222831]">{space.name}</h4>
          <p className="text-[13px] font-medium text-[#67728A]">
            {space.address}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[#DDEEEF] bg-[#F8FBFB] px-[14px] py-[10px] text-[14px] font-medium text-[#67728A]">
            {space.category}
          </span>
          <span className="rounded-full border border-[#DDEEEF] bg-[#F8FBFB] px-[14px] py-[10px] text-[14px] font-medium text-[#67728A]">
            {formatPrice(space.price_per_hour)}
          </span>
        </div>

        <div className="rounded-[18px] bg-[#E8F6F7] p-4">
          <p className="text-[18px] font-bold leading-[1.32] text-[#00ADB5]">
            공간 한줄 요약
          </p>
          <p className="mt-2 text-[13px] font-medium leading-[1.4] text-[#4E5C72]">
            {space.ai_summary || space.description || "요약 정보가 없습니다."}
          </p>
        </div>
      </article>
    </section>
  );
}

function InfoSection({
  title,
  body,
  tone = "default",
}: {
  title: string;
  body: string;
  tone?: "default" | "accent";
}) {
  return (
    <section
      className={`rounded-[30px] px-8 py-7 ${
        tone === "accent" ? "bg-[#E8F6F7]" : "bg-white"
      }`}
    >
      <h2 className="text-[30px] font-bold text-[#222831]">{title}</h2>
      <p
        className={`mt-[18px] w-[1116px] text-[18px] font-medium leading-[1.75] ${
          tone === "accent" ? "text-[#4F5D73]" : "text-[#5E687E]"
        }`}
      >
        {body}
      </p>
    </section>
  );
}

function RelatedCard({
  image,
  likes,
  meta,
  tags,
  title,
  views,
}: {
  image: string;
  likes: string;
  meta: string;
  tags: string[];
  title: string;
  views: string;
}) {
  return (
    <article className="flex h-[220px] rounded-[24px] border border-[#DDEEEF] bg-white p-4">
      <div className="relative h-[188px] w-[148px] shrink-0 overflow-hidden rounded-[18px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="148px"
          className="object-cover"
        />
      </div>

      <div className="ml-4 flex h-full flex-1 flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              className="rounded-full border border-[#DDEEEF] bg-[#F8FBFB] px-[14px] py-[10px] text-[14px] font-medium text-[#67728A]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-[17px] font-bold leading-[1.34] text-[#222831]">
            {title}
          </h3>
          <p className="text-[13px] font-medium leading-[1.42] text-[#67728A]">
            {meta}
          </p>
        </div>
      </div>
    </article>
  );
}

function ImageGallery({ images }: { images: string[] }) {
  return (
    <section className="rounded-[30px] bg-white px-8 py-7">
      <h2 className="text-[30px] font-bold text-[#222831]">이미지</h2>
      <div className="mt-[18px] grid grid-cols-3 gap-4">
        {images.slice(0, 3).map((image) => (
          <div
            className="relative h-[220px] overflow-hidden rounded-[24px] bg-[#EEF1F3]"
            key={image}
          >
            <img
              alt="공간 이미지"
              className="h-full w-full object-cover"
              src={image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

type PageProps = {
  searchParams: Promise<{
    spaceId?: string;
  }>;
};

export default async function PopupDetailPage({ searchParams }: PageProps) {
  const { spaceId } = await searchParams;

  if (!spaceId) {
    return (
      <div className="min-h-screen bg-[#F8FBFB] text-[#222831]">
        <Header />
        <main className="mx-auto flex min-h-[calc(100vh-240px)] w-[1180px] items-center justify-center pb-[96px] pt-10">
          <section className="rounded-[28px] border border-[#DDEEEF] bg-white px-8 py-10 text-center">
            <h1 className="text-[28px] font-bold text-[#222831]">
              공간 ID가 필요해요
            </h1>
            <p className="mt-3 text-[16px] font-medium text-[#67728A]">
              공간 찾기에서 선택한 카드로 들어오면 상세 정보를 볼 수 있어요.
            </p>
            <Link
              className="mt-6 inline-flex rounded-[16px] bg-[#00ADB5] px-5 py-3 text-[14px] font-bold text-white"
              href="/space-search"
            >
              공간 찾기로 이동
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const space = await getSpaceDetail(spaceId);

  if (!space) {
    return (
      <div className="min-h-screen bg-[#F8FBFB] text-[#222831]">
        <Header />
        <main className="mx-auto flex min-h-[calc(100vh-240px)] w-[1180px] items-center justify-center pb-[96px] pt-10">
          <section className="rounded-[28px] border border-[#DDEEEF] bg-white px-8 py-10 text-center">
            <h1 className="text-[28px] font-bold text-[#222831]">
              공간 정보를 불러오지 못했어요
            </h1>
            <p className="mt-3 text-[16px] font-medium text-[#67728A]">
              다시 시도하거나 다른 공간을 선택해보세요.
            </p>
            <Link
              className="mt-6 inline-flex rounded-[16px] bg-[#00ADB5] px-5 py-3 text-[14px] font-bold text-white"
              href="/space-search"
            >
              공간 찾기로 이동
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const heroImage = space.image_urls?.[0] || space.thumbnail_url || "";
  const galleryImages =
    space.image_urls?.length > 0
      ? space.image_urls
      : heroImage
        ? [heroImage]
        : [];

  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#222831]" id="top">
      <Header />

      <main className="mx-auto mt-8 flex w-[1180px] flex-col gap-11 pb-[96px]">
        <section className="flex gap-8">
          <div className="flex w-[740px] flex-col gap-3">
            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-bold text-[#00ADB5]">
                MOMENTLIT SPACE DETAIL
              </p>
              <h1 className="text-[42px] font-bold leading-[1.4] text-[#222831]">
                {space.name}
              </h1>
            </div>

            <div className="relative h-[1057px] w-[740px] overflow-hidden rounded-[24px] bg-[#EEF1F3]">
              {heroImage ? (
                <img
                  alt={space.name}
                  className="h-full w-full object-cover"
                  src={heroImage}
                />
              ) : null}
            </div>
          </div>

          <div className="flex w-[408px] flex-col gap-5 pt-[92px]">
            <SummaryCard space={space} />
            <ConnectedSpaceCard space={space} />
          </div>
        </section>

        <InfoSection
          body={
            space.description ||
            "설명이 등록되어 있지 않습니다. 공간 소개가 들어오면 이 영역에 표시됩니다."
          }
          title="공간 소개"
        />

        <InfoSection
          body={
            space.ai_summary ||
            "AI 요약이 아직 없습니다. 공간의 특징이 들어오면 여기에 표시됩니다."
          }
          title="AI 설명"
          tone="accent"
        />

        {galleryImages.length > 0 ? <ImageGallery images={galleryImages} /> : null}

        <section className="flex flex-col gap-[18px]">
          <h2 className="text-[28px] font-bold leading-[1.4] text-[#222831]">
            비슷한 팝업
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {relatedPopupCards.map((card) => (
              <RelatedCard key={card.title} {...card} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const relatedPopupCards = [
  {
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?fit=max&fm=jpg&q=80&w=1200",
    title: "한남 리미티드 브랜드 팝업",
    meta: "서울 용산구 · 6월 25일 - 7월 9일",
    tags: ["브랜드 팝업"],
    views: "1.6k",
    likes: "132",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?fit=max&fm=jpg&q=80&w=1200",
    title: "연남 아트 토이 전시 팝업",
    meta: "서울 마포구 · 6월 22일 - 7월 6일",
    tags: ["전시"],
    views: "1.4k",
    likes: "96",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?fit=max&fm=jpg&q=80&w=1200",
    title: "성수 캐릭터 체험형 스토어",
    meta: "서울 성동구 · 6월 28일 - 7월 12일",
    tags: ["촬영"],
    views: "1.9k",
    likes: "184",
  },
];
