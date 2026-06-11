export type CalendarSchedule = {
  time: string;
  name: string;
  note: string;
  status: "가능" | "마감";
};

export type CalendarDate = {
  day: number;
  href: string;
  state: "default" | "available" | "closed" | "selected";
  schedules?: CalendarSchedule[];
};

const SEOUL_TIME_ZONE = "Asia/Seoul";
const weekdayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function getSeoulDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SEOUL_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(date);

  const result: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      result[part.type] = part.value;
    }
  }

  return {
    year: Number(result.year),
    month: Number(result.month),
    day: Number(result.day),
    weekday: result.weekday,
  };
}

function getDaysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function getLeadingEmptyCells(year: number, month: number) {
  const firstDay = new Date(Date.UTC(year, month - 1, 1, 12));
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: SEOUL_TIME_ZONE,
    weekday: "short",
  }).format(firstDay);

  const index = weekdayOrder.indexOf(weekday as (typeof weekdayOrder)[number]);
  return index === -1 ? 0 : index;
}

function buildSchedules(day: number): CalendarSchedule[] | undefined {
  if (day === 13) {
    return [
      { time: "13:00", name: "성수 아트 라운지", note: "브랜드 쇼케이스 예약 가능", status: "가능" },
      { time: "16:30", name: "연남 포토 살롱", note: "촬영형 팝업 상담 진행", status: "가능" },
    ];
  }

  if (day === 21) {
    return [
      { time: "13:00", name: "성수 아트 라운지", note: "브랜드 쇼케이스 예약 가능", status: "가능" },
      { time: "16:30", name: "연남 포토 살롱", note: "촬영형 팝업 상담 진행", status: "가능" },
      { time: "19:00", name: "한남 라이브 갤러리", note: "야간 전시 세팅 완료", status: "가능" },
    ];
  }

  return undefined;
}

function getDateState(day: number) {
  if (day === 13 || day === 21) {
    return "available";
  }

  if (day === 16 || day === 24) {
    return "closed";
  }

  return "default";
}

const currentDate = getSeoulDateParts(new Date());

export const calendarMonthLabel = `${currentDate.year}년 ${currentDate.month}월`;
export const calendarLeadingEmptyCells = getLeadingEmptyCells(currentDate.year, currentDate.month);

export const calendarDays: CalendarDate[] = Array.from(
  { length: getDaysInMonth(currentDate.year, currentDate.month) },
  (_, index) => {
    const day = index + 1;
    const date = String(day).padStart(2, "0");
    const month = String(currentDate.month).padStart(2, "0");

    return {
      day,
      href: `/calendar/${currentDate.year}-${month}-${date}`,
      state: getDateState(day),
      schedules: buildSchedules(day),
    };
  },
);

export function getCalendarDate(slug: string) {
  const found = calendarDays.find((item) => item.href.split("/").pop() === slug);
  if (!found) {
    return null;
  }

  return found;
}
