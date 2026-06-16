"use client";

import axios from "axios";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { getAccessToken } from "@/lib/current-user";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type SpaceListItem = {
  space_id: number;
  name: string;
  address: string;
  thumbnail_url: string;
  price_per_hour: number;
  category: string;
};

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

type MeSpacesResponse = {
  message: string;
  data: {
    spaces: SpaceListItem[];
  };
};

type SpaceDetailResponse = {
  message: string;
  data: SpaceDetail;
};

type ScheduleItem = {
  date: string;
  time_blocks: {
    schedule_id: number;
    start_time: string;
    end_time: string;
    status: "AVAILABLE" | "BOOKED" | "BLOCKED" | string;
  }[];
};

type ScheduleResponse = {
  message: string;
  data: {
    schedules: ScheduleItem[];
  };
};

type PopupHistoryResponse = {
  message: string;
  data: {
    popups: {
      popup_id: number;
      title: string;
      thumbnail_url: string;
      start_time: string;
      end_time: string;
      view_count: number;
      like_count: number;
    }[];
  };
};

function getCalendar(year: number, month: number) {
  const leadingEmptyCells = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array.from({ length: leadingEmptyCells }, () => ""),
    ...Array.from({ length: daysInMonth }, (_, index) => String(index + 1)),
  ];

  while (cells.length % 7 !== 0) {
    cells.push("");
  }

  const weeks: string[][] = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return {
    monthLabel: `${year}년 ${month + 1}월`,
    weeks,
  };
}

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ko-KR").format(price)}원/시간`;
}

function CalendarDay({
  value,
  active,
  availability,
}: {
  value: string;
  active?: boolean;
  availability?: "available" | "booked" | "blocked";
}) {
  if (!value) {
    return <div className="h-10 w-10" />;
  }

  return (
    <div
      className={`grid h-10 w-10 place-items-center rounded-xl text-[14px] font-semibold ${
        availability === "blocked"
          ? "bg-[#FCEEEE] text-[#B34848]"
          : availability === "booked"
            ? "bg-[#F0F3F6] text-[#99A1B1]"
            : availability === "available"
              ? `${active ? "ring-2 ring-[#8FD9DE]" : ""} bg-[#E8F6F7] text-[#00ADB5]`
              : active
                ? "bg-[#E8F6F7] text-[#00ADB5]"
                : "bg-white text-[#222831]"
      }`}
    >
      {value}
    </div>
  );
}

function Tag({ children, tone = "muted" }: { children: string; tone?: "muted" | "accent" }) {
  return (
    <span
      className={`rounded-full px-4 py-2 text-[14px] font-semibold ${
        tone === "accent"
          ? "bg-[#E8F6F7] text-[#00ADB5]"
          : "bg-[#F0F3F6] text-[#5E687E]"
      }`}
    >
      {children}
    </span>
  );
}

function getAvailabilityForDate(
  schedules: ScheduleItem[],
  year: number,
  month: number,
  day: string,
) {
  const date = `${year}-${String(month + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
  const schedule = schedules.find((item) => item.date === date);

  if (!schedule) {
    return undefined;
  }

  if (schedule.time_blocks.some((block) => block.status === "AVAILABLE")) {
    return "available";
  }

  if (schedule.time_blocks.some((block) => block.status === "BLOCKED")) {
    return "blocked";
  }

  return "booked";
}

function getScheduleSummary(schedules: ScheduleItem[]) {
  const availableDays = schedules.filter((item) =>
    item.time_blocks.some((block) => block.status === "AVAILABLE"),
  ).length;
  const firstDate = schedules.reduce<string | null>((earliest, item) => {
    if (!earliest || item.date < earliest) {
      return item.date;
    }

    return earliest;
  }, null);

  return {
    availableDays,
    firstDate,
  };
}

export default function HostPostPage() {
  const today = new Date();
  const [displayedDate, setDisplayedDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [space, setSpace] = useState<SpaceDetail | null>(null);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [popupCount, setPopupCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSpace() {
      const accessToken = getAccessToken();

      if (!accessToken) {
        setError("로그인 후 공간 정보를 볼 수 있어요.");
        setLoading(false);
        return;
      }

      try {
        const meResponse = await axios.get<MeSpacesResponse>("/api/spaces/me", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: 10000,
        });

        const firstSpace = meResponse.data?.data?.spaces?.[0];

        if (!firstSpace) {
          if (!cancelled) {
            setError("등록된 공간이 없습니다.");
          }
          return;
        }

        const [detailResponse, scheduleResponse, popupResponse] =
          await Promise.all([
            axios.get<SpaceDetailResponse>(
              `/api/spaces/${firstSpace.space_id}`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                timeout: 10000,
              },
            ),
            axios.get<ScheduleResponse>(
              `/api/spaces/${firstSpace.space_id}/schedule`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                timeout: 10000,
              },
            ),
            axios.get<PopupHistoryResponse>(
              `/api/spaces/${firstSpace.space_id}/popups/history`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                timeout: 10000,
              },
            ),
          ]);

        if (cancelled) {
          return;
        }

        setSpace(detailResponse.data.data);
        setSchedules(scheduleResponse.data?.data?.schedules ?? []);
        setPopupCount(popupResponse.data?.data?.popups?.length ?? 0);
      } catch {
        if (!cancelled) {
          setError("공간 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSpace();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayedYear = displayedDate.getFullYear();
  const displayedMonth = displayedDate.getMonth();
  const { monthLabel, weeks } = getCalendar(displayedYear, displayedMonth);
  const isCurrentMonth =
    displayedYear === today.getFullYear() && displayedMonth === today.getMonth();
  const summary = getScheduleSummary(schedules);
  const title = space?.name ?? "성수 브랜드 팝업 전용 쇼룸";
  const subtitle =
    space?.description ??
    "브랜드 런칭 행사, 시즌 팝업, 전시형 쇼케이스까지 유연하게 운영할 수 있는 성수 중심 공간입니다.";
  const aiSummary =
    space?.ai_summary ??
    "유동 인구, 무드, 활용도까지 한 번에 판단할 수 있도록 핵심만 정리했습니다.";
  const heroImages = [space?.thumbnail_url, ...(space?.image_urls ?? [])].filter(
    (value): value is string => Boolean(value),
  );
  const previewImages = heroImages.slice(0, 4);
  const infoRows = [
    `주소: ${space?.address ?? "부산광역시 강서구 가락대로 1393 (46708)"}`,
    `카테고리: ${space?.category ?? "브랜드 팝업 · 전시 · 촬영"}`,
    `시간당 대여료: ${space ? formatPrice(space.price_per_hour) : "문의 필요"}`,
    `예약 가능 일정: ${summary.availableDays}일`,
    `팝업 이력: ${popupCount}건`,
  ];

  function handlePrevMonth() {
    setDisplayedDate((currentDate) => new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }

  function handleNextMonth() {
    setDisplayedDate((currentDate) => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }

  return (
    <div className="min-h-screen bg-[#f8fbfb] text-[#222831]">
      <Header />

      <main className="mx-auto flex w-full max-w-[1120px] flex-col gap-11 px-6 pb-16 pt-10">
        <section className="grid gap-8 lg:grid-cols-[700px_380px] lg:items-start">
          <div className="flex flex-col gap-5">
            <div className="rounded-[28px] border border-[#D0D3DB] bg-white p-5">
              <div className="flex aspect-[700/620] w-full flex-col gap-4 rounded-[24px] bg-[#F8FBFB] p-6">
                <div className="rounded-[28px] border border-dashed border-[#D0D3DB] bg-white p-4">
                  <div
                    className="aspect-[640/395] rounded-[24px] bg-cover bg-center"
                    style={
                      space?.thumbnail_url
                        ? {
                            backgroundImage: `linear-gradient(135deg, rgba(234,247,248,0.45) 0%, rgba(248,251,251,0.7) 100%), url(${space.thumbnail_url})`,
                          }
                        : {
                            backgroundImage:
                              "linear-gradient(135deg,#EAF7F8 0%, #F8FBFB 100%)",
                          }
                    }
                  />
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {previewImages.length > 0
                      ? previewImages.map((imageUrl, index) => (
                          <div
                            className="grid aspect-[176/118] place-items-center rounded-[18px] border border-[#C9D2D7] bg-cover bg-center"
                            key={`${imageUrl}-${index}`}
                            style={{
                              backgroundImage: `linear-gradient(135deg, rgba(234,247,248,0.25) 0%, rgba(248,251,251,0.45) 100%), url(${imageUrl})`,
                            }}
                          />
                        ))
                      : ["사진 1", "사진 2", "사진 3", "사진 4"].map((label) => (
                          <div
                            className="grid aspect-[176/118] place-items-center rounded-[18px] border border-dashed border-[#C9D2D7] bg-white text-[13px] font-medium text-[#67728A]"
                            key={label}
                          >
                            {label}
                          </div>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-[14px] font-bold tracking-[0.02em] text-[#00ADB5]">
                    HOST SPACE
                  </div>
                  <h1 className="max-w-[640px] text-[34px] font-bold leading-[1.18] tracking-tight text-[#222831]">
                    {title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag tone="accent">
                      {space?.address?.split(" ").slice(0, 2).join(" ") ?? "서울 성수동"}
                    </Tag>
                    <Tag>{space ? formatPrice(space.price_per_hour) : "문의 필요"}</Tag>
                    <Tag>{space?.category ?? "브랜드 팝업 · 전시 · 촬영"}</Tag>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[24px] border border-[#D0D3DB] bg-white px-5 py-5">
                <p className="text-[15px] font-semibold text-[#222831]">
                  공간 소개 미리보기
                </p>
                <p className="mt-3 text-[15px] leading-7 text-[#67728A]">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <article className="rounded-[28px] bg-white p-4 shadow-[0_10px_24px_rgba(15,29,36,0.04)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-bold tracking-tight text-[#222831]">
                  예약 가능 일정
                </h2>
                <div className="flex gap-2">
                  <button
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728a] shadow-[0_0_0_1px_rgba(199,208,214,0.8)]"
                    aria-label="이전 달 보기"
                    onClick={handlePrevMonth}
                    type="button"
                  >
                    &lt;
                  </button>
                  <button
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728a] shadow-[0_0_0_1px_rgba(199,208,214,0.8)]"
                    aria-label="다음 달 보기"
                    onClick={handleNextMonth}
                    type="button"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-[22px] bg-[#F8FBFB] p-4">
                <div className="text-[18px] font-bold text-[#222831]">{monthLabel}</div>

                <div className="mt-4 grid grid-cols-7 gap-1">
                  {weekdays.map((day) => (
                    <div
                      key={day}
                      className="grid h-7 w-9 place-items-center rounded-xl text-[10px] font-bold text-[#67728a]"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-1">
                  {weeks.flatMap((week, weekIndex) =>
                    week.map((day, dayIndex) => (
                      <CalendarDay
                        active={isCurrentMonth && day === String(today.getDate())}
                        availability={
                          day
                            ? getAvailabilityForDate(
                                schedules,
                                displayedYear,
                                displayedMonth,
                                day,
                              )
                            : undefined
                        }
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

                {summary.firstDate ? (
                  <p className="mt-3 text-[12px] font-medium text-[#7B8C8E]">
                    첫 일정: {summary.firstDate}
                  </p>
                ) : null}
              </div>

              <button
                className="mt-4 h-12 w-full rounded-[18px] bg-[#00ADB5] text-[18px] font-bold text-white"
                type="button"
              >
                문의하기 · 채팅 연결
              </button>
            </article>

            <article className="rounded-[28px] bg-white p-4 shadow-[0_10px_24px_rgba(15,29,36,0.04)]">
              <h3 className="text-[22px] font-bold tracking-tight text-[#222831]">
                공간 정보
              </h3>
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
              {loading
                ? "공간 정보를 불러오는 중이에요."
                : error || subtitle}
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
              {loading
                ? "공간 정보를 불러오는 중이에요."
                : error || aiSummary}
            </p>
          </article>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
