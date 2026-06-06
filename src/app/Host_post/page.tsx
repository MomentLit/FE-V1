import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";

const heroImages = [
  {
    title: "Host desk",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=520&q=80",
    size: "side",
  },
  {
    title: "Room details",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=620&q=80",
    size: "mid",
  },
  {
    title: "Main host space",
    image:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=860&q=80",
    size: "main",
  },
  {
    title: "Evening salon",
    image:
      "https://images.unsplash.com/photo-1514894780887-121968d00567?auto=format&fit=crop&w=620&q=80",
    size: "mid dark",
  },
  {
    title: "Vintage room",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=520&q=80",
    size: "side",
  },
];

const postSteps = [
  ["공간 기본 정보", "공간명, 위치, 운영 시간을 먼저 등록해요.", "01"],
  ["사진과 분위기", "대표 사진과 MomentLit에 맞는 무드를 골라요.", "02"],
  ["예약 조건", "인원, 가격, 이용 규칙을 한 번에 정리해요.", "03"],
  ["검수 요청", "등록 내용을 확인하고 호스트 심사를 요청해요.", "04"],
];

const hostFields = [
  ["공간 이름", "예: 햇살이 오래 머무는 작은 작업실"],
  ["지역", "서울 성수동"],
  ["수용 인원", "최대 8명"],
  ["시간당 금액", "45,000원"],
  ["대표 무드", "조용한, 빈티지, 대화하기 좋은"],
  ["운영 시간", "평일 11:00 - 21:00"],
];

const previewCards = [
  ["따뜻한 창가", "오후 자연광이 잘 드는 대표 좌석"],
  ["작은 테이블", "2-4인 모임에 맞는 배치"],
  ["촬영 포인트", "필름 사진이 잘 나오는 오브제"],
  ["안내 메모", "주차, 반려동물, 외부 음식 정책"],
  ["호스트 톤", "친절하고 차분한 소개 문장"],
  ["예약 체크", "승인 전 마지막 확인 항목"],
];

function HostHero() {
  return (
    <section
      className="relative h-[572px] overflow-hidden bg-white"
      id="top"
    >
      <div className="absolute inset-x-0 top-5 h-[476px]">
        <div className="flex h-full w-full items-center justify-center gap-5">
          {heroImages.map((card) => (
            <article
              aria-label={card.title}
              className={`hero-card ${card.size}`}
              key={card.title}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                priority={card.size === "main"}
                loading={card.size === "main" ? "eager" : "lazy"}
                sizes={
                  card.size === "main"
                    ? "456px"
                    : card.size === "mid" || card.size === "mid dark"
                      ? "262px"
                      : "190px"
                }
                className="object-cover"
              />
            </article>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 top-[190px] z-10 w-[520px] -translate-x-1/2 text-center text-white drop-shadow-[0_10px_28px_rgb(15_29_36_/_35%)]">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-normal">
          MomentLit Host
        </p>
        <h1 className="text-[38px] font-semibold leading-[1.18] tracking-normal">
          당신의 공간을 취향이 머무는 순간으로 등록하세요
        </h1>
      </div>
    </section>
  );
}

function StepCard({
  desc,
  index,
  title,
}: {
  desc: string;
  index: string;
  title: string;
}) {
  return (
    <article className="min-h-[164px] rounded-[6px] border border-[#C4CCD1] bg-white px-5 py-5">
      <span className="text-[12px] font-semibold text-[#10B7C5]">{index}</span>
      <h3 className="mt-6 text-[18px] font-semibold text-[#202A31]">{title}</h3>
      <p className="mt-3 text-[13px] leading-6 text-[#6A767E]">{desc}</p>
    </article>
  );
}

function FieldCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-[6px] border border-[#C4CCD1] bg-[#F7F9FA] px-5 py-4">
      <p className="text-[12px] font-semibold text-[#6D7880]">{label}</p>
      <p className="mt-3 truncate text-[15px] font-medium text-[#202A31]">
        {value}
      </p>
    </article>
  );
}

function PreviewCard({ meta, title }: { meta: string; title: string }) {
  return (
    <article className="group w-full">
      <div className="relative aspect-[160/205] overflow-hidden rounded-[6px] border border-[#C4CCD1] bg-[#EEF1F3] card-pattern">
        <span className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-[#10B7C5]">
          HOST
        </span>
      </div>
      <div className="mt-3 min-h-[54px] text-[12px] leading-[1.45] text-[#6D7880]">
        <h3 className="mb-1 truncate text-[13px] font-medium text-[#29333B]">
          {title}
        </h3>
        <p>{meta}</p>
      </div>
    </article>
  );
}

export default function HostPost() {
  return (
    <div className="min-h-screen bg-white text-[#172129]">
      <Header />
      <main>
        <HostHero />

        <div className="mx-auto flex max-w-[1440px] flex-col gap-9 px-12 pb-[140px]">
          <Section
            actionLabel="도움말 보기"
            id="host-flow"
            title="호스트 등록 흐름"
            subtitle="공간을 등록하고 검수 요청까지 이어지는 핵심 단계를 확인하세요."
          >
            <div className="grid grid-cols-4 gap-6">
              {postSteps.map(([title, desc, index]) => (
                <StepCard
                  desc={desc}
                  index={index}
                  key={title}
                  title={title}
                />
              ))}
            </div>
          </Section>

          <Section
            actionLabel="도움말 보기"
            id="host-preview"
            title="등록 정보 미리보기"
            subtitle="게스트에게 보여질 주요 정보를 같은 화면 비율로 정리했어요."
          >
            <div className="grid grid-cols-3 gap-6">
              {hostFields.map(([label, value]) => (
                <FieldCard key={label} label={label} value={value} />
              ))}
            </div>
          </Section>

          <Section
            actionLabel="도움말 보기"
            id="space-intro"
            title="공간 소개 구성"
            subtitle="사진, 안내 문구, 예약 조건까지 한 번에 점검할 수 있어요."
          >
            <div className="grid grid-cols-6 gap-6">
              {previewCards.map(([title, meta]) => (
                <PreviewCard key={title} meta={meta} title={title} />
              ))}
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
