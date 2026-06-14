"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { useState } from "react";

export const dynamic = "force-dynamic";

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const infoRows = [
  "주소: 부산광역시 강서구 가락대로 1393 (46708)",
  "이메일: momentlit@exam.com",
  "도시의 팝업과 전시를 가장 빠르게 발견하는 큐레이션 플랫폼",
];

function getCalendar(year: number, month: number) {
  const leadingEmptyCells = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

const heroSizeClasses = {
  side: "h-[320px] w-[190px] max-[1180px]:hidden",
  mid: "h-[388px] w-[262px]",
  main: "h-[476px] w-[456px] rounded-[24px]",
  "mid dark": "h-[388px] w-[262px] bg-[#444] bg-blend-multiply",
} as const;

const cardPatternClasses =
  "bg-[radial-gradient(circle_at_1px_1px,rgb(149_158_164_/_65%)_1px,transparent_1px),linear-gradient(135deg,rgb(255_255_255_/_72%)_0_25%,transparent_25%_50%,rgb(255_255_255_/_72%)_50%_75%,transparent_75%)] [background-position:0_0,0_0] [background-size:10px_10px,18px_18px]";

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
              className={`relative shrink-0 overflow-hidden rounded-[22px] bg-cover bg-center shadow-[0_22px_50px_rgb(15_29_36_/_12%)] ${heroSizeClasses[card.size as keyof typeof heroSizeClasses]}`}
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

function CalendarDay({
  value,
  active,
  inactive,
}: {
  value: string;
  active?: boolean;
  inactive?: boolean;
}) {
  if (!value) {
    return <div className="h-10 w-10" />;
  }

  return (
    <div
      className={`grid h-10 w-10 place-items-center rounded-xl text-[14px] font-semibold ${
        active
          ? "bg-[#E8F6F7] text-[#00ADB5]"
          : inactive
            ? "bg-[#F0F3F6] text-[#99A1B1]"
            : "bg-white text-[#222831]"
      }`}
    >
      {value}
    </div>
  );
}

function Tag({ children, tone = "muted" }: { children: string; tone?: "muted" | "accent" }) {
  return (
    <article className="group w-full">
      <div
        className={`relative aspect-[160/205] overflow-hidden rounded-[6px] border border-[#C4CCD1] bg-[#EEF1F3] ${cardPatternClasses}`}
      >
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

export default function HostPostPage() {
  const today = new Date();
  const [displayedYear, setDisplayedYear] = useState(today.getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(today.getMonth());
  const { monthLabel, weeks } = getCalendar(displayedYear, displayedMonth);
  const isCurrentMonth =
    displayedYear === today.getFullYear() && displayedMonth === today.getMonth();

  function handlePrevMonth() {
    setDisplayedMonth((currentMonth) => {
      if (currentMonth === 0) {
        setDisplayedYear((currentYear) => currentYear - 1);
        return 11;
      }

      return currentMonth - 1;
    });
  }

  function handleNextMonth() {
    setDisplayedMonth((currentMonth) => {
      if (currentMonth === 11) {
        setDisplayedYear((currentYear) => currentYear + 1);
        return 0;
      }

      return currentMonth + 1;
    });
  }

  return (
    <div className="min-h-screen bg-[#f8fbfb] text-[#222831]">
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
            <div className="grid grid-cols-4 gap-6 max-[1180px]:grid-cols-3">
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
            <div className="grid grid-cols-6 gap-6 max-[1180px]:grid-cols-3">
              {previewCards.map(([title, meta]) => (
                <PreviewCard key={title} meta={meta} title={title} />
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <article className="rounded-[28px] bg-white p-4 shadow-[0_10px_24px_rgba(15,29,36,0.04)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-bold tracking-tight text-[#222831]">예약 가능 일정</h2>
                <div className="flex gap-2">
                  <button className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728a] shadow-[0_0_0_1px_rgba(199,208,214,0.8)]" onClick={handlePrevMonth} type="button">
                    &lt;
                  </button>
                  <button className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728a] shadow-[0_0_0_1px_rgba(199,208,214,0.8)]" onClick={handleNextMonth} type="button">
                    &gt;
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-[22px] bg-[#F8FBFB] p-4">
                <div className="text-[18px] font-bold text-[#222831]">{monthLabel}</div>

                <div className="mt-4 grid grid-cols-7 gap-1">
                  {weekdays.map((day) => (
                    <div key={day} className="grid h-7 w-9 place-items-center rounded-xl text-[10px] font-bold text-[#67728a]">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-1">
                  {weeks.flatMap((week, weekIndex) =>
                    week.map((day, dayIndex) => (
                      <CalendarDay
                        active={isCurrentMonth && day === String(today.getDate())}
                        inactive={weekIndex === 0 && !day}
                        key={`${weekIndex}-${dayIndex}-${day}`}
                        value={day}
                      />
                    )),
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00ADB5]" />
                    <span className="text-[13px] font-medium text-[#5E687E]">예약 가능</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D0D3DB]" />
                    <span className="text-[13px] font-medium text-[#5E687E]">마감/휴무</span>
                  </div>
                </div>
              </div>

              <button className="mt-4 h-12 w-full rounded-[18px] bg-[#00ADB5] text-[18px] font-bold text-white" type="button">
                문의하기 · 채팅 연결
              </button>
            </article>

            <article className="rounded-[28px] bg-white p-4 shadow-[0_10px_24px_rgba(15,29,36,0.04)]">
              <h3 className="text-[22px] font-bold tracking-tight text-[#222831]">공간 정보</h3>
              <div className="mt-4 space-y-2 text-[15px] leading-[1.8] font-medium text-[#5E687E]">
                {infoRows.map((row) => (
                  <p key={row}>{row}</p>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <Section
          actionLabel="상세 보기"
          id="space-intro"
          title="공간 소개"
          subtitle="브랜드 런칭 행사, 시즌 팝업, 전시형 쇼케이스까지 유연하게 운영할 수 있는 공간입니다."
        >
          <article className="rounded-[30px] bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,29,36,0.04)]">
            <p className="max-w-[1060px] text-[16px] leading-[1.8] font-medium text-[#5E687E]">
              높은 층고와 넓은 전면 유리 덕분에 낮에는 개방감이 좋고, 저녁에는 조명
              연출이 깔끔하게 살아납니다. 브랜드의 분위기를 진하게 드러내면서도
              과하지 않은 쇼룸 무드를 유지하는 데 초점을 맞췄습니다.
            </p>
          </article>
        </Section>

        <Section
          actionLabel="상세 보기"
          id="ai-summary"
          title="AI 공간 요약"
          subtitle="유동 인구, 무드, 활용도까지 한 번에 판단할 수 있도록 핵심만 정리했습니다."
        >
          <article className="rounded-[30px] bg-[#E8F6F7] px-6 py-6">
            <p className="max-w-[1060px] text-[16px] leading-[1.8] font-medium text-[#4F5D73]">
              이 공간은 브랜드 팝업과 소규모 전시에 특히 적합해요. 성수 메인 동선과
              가까워 외부 노출이 좋고, 신상품 공개나 체험형 이벤트 운영에 강점이
              있습니다. 예약 전에는 주말 피크 타임과 반입 동선을 꼭 확인해보는 것을
              추천합니다.
            </p>
          </article>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
