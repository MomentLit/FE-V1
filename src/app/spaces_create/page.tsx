import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const weekdayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const calendarRows = [
  [
    { value: "", tone: "empty" },
    { value: "", tone: "empty" },
    { value: "", tone: "empty" },
    { value: "", tone: "empty" },
    { value: "1", tone: "muted" },
    { value: "2", tone: "accent" },
    { value: "3", tone: "muted" },
  ],
  [
    { value: "4", tone: "muted" },
    { value: "5", tone: "warning" },
    { value: "6", tone: "muted" },
    { value: "7", tone: "selected" },
    { value: "8", tone: "muted" },
    { value: "9", tone: "accent" },
    { value: "10", tone: "muted" },
  ],
  [
    { value: "11", tone: "disabled" },
    { value: "12", tone: "accent" },
    { value: "13", tone: "warning" },
    { value: "14", tone: "muted" },
    { value: "15", tone: "muted" },
    { value: "16", tone: "muted" },
    { value: "17", tone: "muted" },
  ],
  [
    { value: "18", tone: "muted" },
    { value: "19", tone: "muted" },
    { value: "20", tone: "muted" },
    { value: "21", tone: "accent" },
    { value: "22", tone: "muted" },
    { value: "23", tone: "muted" },
    { value: "24", tone: "disabled" },
  ],
  [
    { value: "25", tone: "muted" },
    { value: "26", tone: "muted" },
    { value: "27", tone: "muted" },
    { value: "28", tone: "muted" },
    { value: "29", tone: "muted" },
    { value: "30", tone: "muted" },
    { value: "31", tone: "muted" },
  ],
];

const fieldRows = [
  [
    ["카테고리", "예) 팝업 스토어 / 전시 / 쇼룸"],
    ["지역", "예) 서울 성수동"],
  ],
  [
    ["수용 인원", "예) 최대 100명"],
    ["운영 가능 일정", "예) 평일 / 주말 모두 가능"],
  ],
  [
    ["희망 대관 단가", "예) 일 120만원부터"],
    ["연락 방식", "예) 이메일 + 플랫폼 메시지"],
  ],
] as const;

function CalendarCell({
  value,
  tone,
}: {
  value: string;
  tone: "empty" | "muted" | "accent" | "warning" | "selected" | "disabled";
}) {
  if (!value) {
    return <div className="h-11 w-12" />;
  }

  const styles: Record<typeof tone, string> = {
    empty: "bg-transparent text-transparent",
    muted: "bg-white text-[#222831]",
    accent: "bg-[#E8F6F7] text-[#008992]",
    warning: "bg-[#FFF4E8] text-[#C97A1A]",
    selected: "bg-[#00ADB5] text-white",
    disabled: "bg-white text-[#BAC2D0]",
  };

  return (
    <div className={`grid h-11 w-12 place-items-center rounded-[14px] text-[14px] font-semibold ${styles[tone]}`}>
      {value}
    </div>
  );
}

function FieldCard({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-semibold text-[#222831]">{label}</span>
      <div className="flex h-[58px] items-center rounded-[16px] border border-[#C8E4E6] bg-white px-[18px] text-[15px] font-medium text-[#99A1B1]">
        {placeholder}
      </div>
    </div>
  );
}

function PhotoThumb({ label }: { label: string }) {
  return (
    <div className="grid h-[122px] w-full place-items-center rounded-[20px] border border-[#DDEEEF] bg-[#F3F7F7] text-[14px] font-semibold text-[#8A94A6]">
      {label}
    </div>
  );
}

export default function HostPostPage() {
  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#222831]">
      <Header />

      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-8">
        <section className="rounded-[30px] bg-white px-8 py-8">
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-medium text-[#00ADB5]">HOST POST WRITING</p>
            <h1 className="text-[42px] font-bold tracking-tight text-[#222831]">공간 등록 글 작성</h1>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[760px_minmax(0,1fr)]">
          <div className="rounded-[30px] bg-white p-[30px]">
            <div className="rounded-[28px] bg-[#E8F6F7] p-7">
              <div className="flex h-[420px] flex-col justify-between">
                <div className="grid flex-1 place-items-center rounded-[24px] border border-dashed border-[#D0D3DB] bg-white">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="text-[54px] font-light leading-none text-[#00ADB5]">+</div>
                    <div className="text-[24px] font-bold text-[#222831]">사진</div>
                    <div className="text-[15px] font-medium text-[#5E687E]">첫 사진이 대표 이미지로 보여집니다</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-3">
                  <PhotoThumb label="추가 사진" />
                  <PhotoThumb label="추가 사진" />
                  <PhotoThumb label="추가 사진" />
                  <PhotoThumb label="추가 사진" />
                </div>
              </div>
            </div>
          </div>

          <article className="rounded-[28px] bg-white p-5">
            <h2 className="text-[24px] font-bold text-[#222831]">예약 가능 일정</h2>
            <p className="mt-2 text-[14px] font-medium text-[#5E687E]">
              사진 옆에서 바로 예약 가능 일정을 설정할 수 있어요.
            </p>

            <div className="mt-4 rounded-[22px] bg-[#F8FBFB] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold text-[#222831]">2026년 5월</h3>
                <div className="flex gap-2">
                  <button
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]"
                    type="button"
                  >
                    &lt;
                  </button>
                  <button
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]"
                    type="button"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1.5">
                {weekdayLabels.map((day) => (
                  <div key={day} className="grid h-8 w-12 place-items-center text-[11px] font-bold text-[#7C8799]">
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-1.5">
                {calendarRows.flat().map((item, index) => (
                  <CalendarCell key={`${item.value || "empty"}-${index}`} tone={item.tone} value={item.value} />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#008992]" />
                  <span className="text-[12px] font-bold text-[#008992]">예약 가능</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00ADB5]" />
                  <span className="text-[12px] font-bold text-[#008992]">선택 날짜</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C97A1A]" />
                  <span className="text-[12px] font-bold text-[#C97A1A]">조율 가능</span>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-[30px] bg-white p-7">
          <h2 className="text-[28px] font-bold text-[#222831]">제목</h2>
          <div className="mt-4 flex h-[58px] items-center rounded-[16px] border border-[#C8E4E6] bg-white px-[18px] text-[15px] font-medium text-[#99A1B1]">
            예) 성수 브랜드 팝업 전용 쇼룸
          </div>
        </section>

        <section className="rounded-[30px] bg-white p-7">
          <h2 className="text-[28px] font-bold text-[#222831]">공간소개</h2>
          <div className="mt-4 rounded-[24px] bg-[#F8FBFB] p-[22px]">
            <p className="text-[16px] font-medium leading-8 text-[#4F5D73]">
              예) 성수 메인 동선에 위치한 이 공간은 브랜드 팝업, 쇼룸, 전시에 잘 어울립니다.
              전면 유리와 높은 층고 덕분에 낮에는 자연광이 풍부하고, 저녁에는 조명 연출이 깔끔하게 살아납니다.
              {"\n\n"}
              가구 배치가 유연해서 행사 성격에 맞게 동선을 구성하기 좋고, 방문객이 사진 찍기 좋은 포인트도 충분합니다.
            </p>
          </div>
        </section>

        <section className="rounded-[30px] bg-white p-7">
          <h2 className="text-[28px] font-bold text-[#222831]">공간정보</h2>
          <div className="mt-4 grid gap-4">
            {fieldRows.map((row, rowIndex) => (
              <div className="grid gap-4 lg:grid-cols-2" key={rowIndex}>
                {row.map(([label, placeholder]) => (
                  <FieldCard key={label} label={label} placeholder={placeholder} />
                ))}
              </div>
            ))}

            <div className="mt-2 flex w-full justify-end gap-3">
              <button className="h-14 w-[180px] rounded-full bg-[#F3F7F7] text-[15px] font-medium text-[#4F5D73]" type="button">
                임시 저장
              </button>
              <button className="h-14 w-[220px] rounded-full bg-[#00ADB5] text-[15px] font-medium text-white" type="button">
                등록 요청하기
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
