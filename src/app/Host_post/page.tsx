import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";

export const dynamic = "force-dynamic";

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const infoRows = [
  "주소: 부산광역시 강서구 가락대로 1393 (46708)",
  "이메일: momentlit@exam.com",
  "도시의 팝업과 전시를 가장 빠르게 발견하는 큐레이션 플랫폼",
];

function getCurrentCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
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
    day,
    monthLabel: `${year}년 ${month + 1}월`,
    weeks,
  };
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

export default function HostPostPage() {
  const { day: todayDate, monthLabel, weeks } = getCurrentCalendar();

  return (
    <div className="min-h-screen bg-[#f8fbfb] text-[#222831]">
      <Header />

      <main className="mx-auto flex w-full max-w-[1120px] flex-col gap-11 px-6 pb-16 pt-10">
        <section className="grid gap-8 lg:grid-cols-[700px_380px] lg:items-start">
          <div className="flex flex-col gap-5">
            <div className="rounded-[28px] border border-[#D0D3DB] bg-white p-5">
              <div className="flex aspect-[700/620] w-full flex-col justify-between rounded-[24px] bg-[#F8FBFB] p-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="text-[14px] font-bold tracking-[0.02em] text-[#00ADB5]">HOST SPACE</div>
                    <h1 className="max-w-[640px] text-[34px] font-bold leading-[1.18] tracking-tight text-[#222831]">
                      성수 브랜드 팝업 전용 쇼룸
                    </h1>
                    <div className="flex flex-wrap items-center gap-3">
                      <Tag tone="accent">서울 성수동</Tag>
                      <Tag>최대 120명</Tag>
                      <Tag>브랜드 팝업 · 전시 · 촬영</Tag>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#E8F6F7] px-4 py-2 text-[12px] font-semibold text-[#00ADB5]">
                    사진 자리
                  </span>
                </div>

                <div className="rounded-[28px] border border-dashed border-[#D0D3DB] bg-white p-4">
                  <div className="aspect-[640/395] rounded-[24px] bg-[linear-gradient(135deg,#EAF7F8_0%,#F8FBFB_100%)]" />
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {["사진 1", "사진 2", "사진 3", "사진 4"].map((label) => (
                      <div
                        className="grid aspect-[176/118] place-items-center rounded-[18px] border border-dashed border-[#C9D2D7] bg-white text-[13px] font-medium text-[#67728A]"
                        key={label}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[24px] border border-[#D0D3DB] bg-white px-5 py-5">
                <p className="text-[15px] font-semibold text-[#222831]">공간 소개 미리보기</p>
                <p className="mt-3 text-[15px] leading-7 text-[#67728A]">
                  브랜드 런칭 행사, 시즌 팝업, 전시형 쇼케이스까지 유연하게 운영할 수 있는
                  성수 중심 공간입니다.
                </p>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <article className="rounded-[28px] bg-white p-4 shadow-[0_10px_24px_rgba(15,29,36,0.04)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-bold tracking-tight text-[#222831]">예약 가능 일정</h2>
                <div className="flex gap-2">
                  <button className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728a] shadow-[0_0_0_1px_rgba(199,208,214,0.8)]" type="button">
                    &lt;
                  </button>
                  <button className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728a] shadow-[0_0_0_1px_rgba(199,208,214,0.8)]" type="button">
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
                        active={day === String(todayDate)}
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
