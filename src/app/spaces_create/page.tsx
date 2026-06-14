"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useState } from "react";
import { SpaceCreateForm } from "./SpaceCreateForm";

const weekdayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function CalendarCell({
  value,
  isSelected,
  onClick,
}: {
  value: string;
  isSelected: boolean;
  onClick?: () => void;
}) {
  if (!value) {
    return <div className="h-11 w-12" />;
  }

  return (
    <button
      className={`grid h-11 w-12 place-items-center rounded-[14px] text-[14px] font-semibold transition ${
        isSelected
          ? "bg-[#00ADB5] text-white"
          : "bg-white text-[#222831] hover:bg-[#E8F6F7]"
      }`}
      aria-pressed={isSelected}
      onClick={onClick}
      type="button"
    >
      {value}
    </button>
  );
}

function PhotoThumb({ label }: { label: string }) {
  return (
    <div className="grid h-[122px] w-full place-items-center rounded-[20px] border border-[#DDEEEF] bg-[#F3F7F7] text-[14px] font-semibold text-[#8A94A6]">
      {label}
    </div>
  );
}

function buildCalendarGrid(
  year: number,
  month: number,
  selectedDates: string[],
) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ value: string; dateKey: string | null }> = [];

  for (let index = 0; index < startOffset; index += 1) {
    cells.push({ dateKey: null, value: "" });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const monthLabel = String(month + 1).padStart(2, "0");
    const dayLabel = String(day).padStart(2, "0");
    const dateKey = `${year}-${monthLabel}-${dayLabel}`;

    cells.push({ dateKey, value: String(day) });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ dateKey: null, value: "" });
  }

  return cells.map((cell) => ({
    ...cell,
    isSelected: cell.dateKey ? selectedDates.includes(cell.dateKey) : false,
  }));
}

export default function HostPostPage() {
  const today = new Date();
  const [displayedYear, setDisplayedYear] = useState(today.getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(today.getMonth());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const calendarCells = buildCalendarGrid(
    displayedYear,
    displayedMonth,
    selectedDates,
  );

  const handlePrevMonth = () => {
    setDisplayedMonth((currentMonth) => {
      if (currentMonth === 0) {
        setDisplayedYear((currentYear) => currentYear - 1);
        return 11;
      }

      return currentMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setDisplayedMonth((currentMonth) => {
      if (currentMonth === 11) {
        setDisplayedYear((currentYear) => currentYear + 1);
        return 0;
      }

      return currentMonth + 1;
    });
  };

  const handleDateClick = (dateKey: string) => {
    setSelectedDates((currentSelectedDates) =>
      currentSelectedDates.includes(dateKey)
        ? currentSelectedDates.filter((value) => value !== dateKey)
        : [...currentSelectedDates, dateKey],
    );
  };

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
                <h3 className="text-[20px] font-bold text-[#222831]">
                  {`${displayedYear}년 ${displayedMonth + 1}월`}
                </h3>
                <div className="flex gap-2">
                  <button
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]"
                    aria-label="이전 달"
                    onClick={handlePrevMonth}
                    type="button"
                  >
                    &lt;
                  </button>
                  <button
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]"
                    aria-label="다음 달"
                    onClick={handleNextMonth}
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
                {calendarCells.map((item, index) => (
                  <CalendarCell
                    key={`${item.dateKey || "empty"}-${index}`}
                    isSelected={item.isSelected}
                    onClick={item.dateKey ? () => handleDateClick(item.dateKey) : undefined}
                    value={item.value}
                  />
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

        <SpaceCreateForm />
      </main>

      <Footer />
    </div>
  );
}
