"use client";
/* eslint-disable @next/next/no-img-element */

import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SpaceCreateForm } from "./SpaceCreateForm";

const weekdayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type ImageSlot = {
  file: File | null;
  previewUrl: string;
};

function createEmptySlots() {
  return Array.from({ length: 5 }, () => ({ file: null, previewUrl: "" }));
}

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

function PhotoSlot({
  className,
  fileIndex,
  imageSlot,
  label,
  onChange,
  placeholder,
}: {
  className: string;
  fileIndex: number;
  imageSlot: ImageSlot;
  label: string;
  onChange: (slotIndex: number, file: File | null) => void;
  placeholder: ReactNode;
}) {
  return (
    <label className={`${className} relative cursor-pointer overflow-hidden`}>
      <input
        aria-label={label}
        accept="image/*"
        className="sr-only"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(fileIndex, event.target.files?.[0] ?? null)
        }
        type="file"
      />
      {imageSlot.previewUrl ? (
        <img
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
          src={imageSlot.previewUrl}
        />
      ) : (
        placeholder
      )}
    </label>
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
  const [displayedDate, setDisplayedDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>(createEmptySlots);
  const imageSlotsRef = useRef(imageSlots);

  useEffect(() => {
    imageSlotsRef.current = imageSlots;
  }, [imageSlots]);

  useEffect(() => {
    return () => {
      imageSlotsRef.current.forEach((slot) => {
        if (slot.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(slot.previewUrl);
        }
      });
    };
  }, []);

  const displayedYear = displayedDate.getFullYear();
  const displayedMonth = displayedDate.getMonth();
  const calendarCells = buildCalendarGrid(
    displayedYear,
    displayedMonth,
    selectedDates,
  );

  const handlePrevMonth = () => {
    setDisplayedDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setDisplayedDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handleDateClick = (dateKey: string) => {
    setSelectedDates((currentSelectedDates) =>
      currentSelectedDates.includes(dateKey)
        ? currentSelectedDates.filter((value) => value !== dateKey)
        : [...currentSelectedDates, dateKey],
    );
  };

  const handleImageSlotChange = (slotIndex: number, file: File | null) => {
    setImageSlots((currentSlots) => {
      const nextSlots = [...currentSlots];
      const previousSlot = nextSlots[slotIndex];

      if (previousSlot?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previousSlot.previewUrl);
      }

      nextSlots[slotIndex] = {
        file,
        previewUrl: file ? URL.createObjectURL(file) : "",
      };

      return nextSlots;
    });
  };

  const mainImage = imageSlots[0]?.previewUrl ?? "";
  const galleryCount = imageSlots.filter((slot) => slot.file).length;

  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#222831]">
      <Header />

      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-8">
        <section className="rounded-[30px] bg-white px-8 py-8">
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-medium tracking-[0.08em] text-[#00ADB5]">
              HOST POST WRITING
            </p>
            <h1 className="text-[42px] font-bold tracking-tight text-[#222831]">
              공간 등록 글 작성
            </h1>
            <p className="max-w-[720px] text-[15px] font-medium leading-7 text-[#67728A]">
              사진, 예약 일정, 공간 정보를 입력하고 등록 요청을 보내세요.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <div className="rounded-[30px] bg-white p-[30px]">
            <div className="rounded-[28px] bg-[#E8F6F7] p-7">
              <div className="flex h-full flex-col">
                <PhotoSlot
                  className="group relative grid min-h-[420px] flex-1 place-items-center rounded-[24px] border border-dashed border-[#D0D3DB] bg-white transition hover:border-[#00ADB5]/40"
                  fileIndex={0}
                  imageSlot={{ ...imageSlots[0], previewUrl: mainImage }}
                  label="대표 사진 선택"
                  onChange={handleImageSlotChange}
                  placeholder={
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <div className="text-[54px] font-light leading-none text-[#00ADB5]">
                        +
                      </div>
                      <div className="text-[24px] font-bold text-[#222831]">
                        사진
                      </div>
                      <div className="text-[15px] font-medium text-[#5E687E]">
                        첫 사진이 대표 이미지로 보여집니다
                      </div>
                    </div>
                  }
                />

                <div className="mt-4 grid grid-cols-4 gap-3">
                  {imageSlots.slice(1, 5).map((imageSlot, index) => (
                    <PhotoSlot
                      className="grid h-[122px] w-full place-items-center rounded-[20px] border border-[#DDEEEF] bg-[#F3F7F7] text-[14px] font-semibold text-[#8A94A6] transition hover:border-[#00ADB5]/35 hover:bg-[#ECFAFB]"
                      fileIndex={index + 1}
                      imageSlot={imageSlot}
                      key={`thumb-${index}`}
                      label={`추가 사진 ${index + 1}`}
                      onChange={handleImageSlotChange}
                      placeholder={
                        <span className="flex flex-col items-center gap-1">
                          <span className="text-[28px] leading-none text-[#00ADB5]">
                            +
                          </span>
                          <span>추가 사진</span>
                        </span>
                      }
                    />
                  ))}
                </div>

                <p className="mt-4 text-[13px] font-medium leading-6 text-[#5E687E]">
                  클릭해서 이미지를 선택하세요. 현재 {galleryCount}장의 이미지가
                  선택되었습니다.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[30px] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[24px] font-bold text-[#222831]">
                  예약 가능 일정
                </h2>
                <p className="mt-2 text-[14px] font-medium text-[#5E687E]">
                  공간 운영이 가능한 날짜를 선택해두면 정리할 때 편합니다.
                </p>
              </div>
              <span className="rounded-full bg-[#E8F6F7] px-4 py-2 text-[12px] font-semibold text-[#008992]">
                {selectedDates.length}일 선택
              </span>
            </div>

            <div className="mt-4 rounded-[22px] bg-[#F8FBFB] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold text-[#222831]">
                  {`${displayedYear}년 ${displayedMonth + 1}월`}
                </h3>
                <div className="flex gap-2">
                  <button
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]"
                    aria-label="이전 달로 이동"
                    onClick={handlePrevMonth}
                    type="button"
                  >
                    &lt;
                  </button>
                  <button
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]"
                    aria-label="다음 달로 이동"
                    onClick={handleNextMonth}
                    type="button"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1.5">
                {weekdayLabels.map((day) => (
                  <div
                    key={day}
                    className="grid h-8 w-12 place-items-center text-[11px] font-bold text-[#7C8799]"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-1.5">
                {calendarCells.map((item, index) => (
                  <CalendarCell
                    key={`${item.dateKey || "empty"}-${index}`}
                    isSelected={item.isSelected}
                    onClick={
                      item.dateKey ? () => handleDateClick(item.dateKey) : undefined
                    }
                    value={item.value}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#008992]" />
                  <span className="text-[12px] font-bold text-[#008992]">
                    예약 가능
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00ADB5]" />
                  <span className="text-[12px] font-bold text-[#008992]">
                    선택 날짜
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C97A1A]" />
                  <span className="text-[12px] font-bold text-[#C97A1A]">
                    조율 가능
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <SpaceCreateForm
          imageFiles={imageSlots.map((slot) => slot.file)}
          selectedDates={selectedDates}
        />
      </main>

      <Footer />
    </div>
  );
}
