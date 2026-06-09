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

export const calendarMonthLabel = "2026년 5월";

export const calendarDays: CalendarDate[] = [
  { day: 1, href: "/calendar/2026-05-01", state: "default" },
  { day: 2, href: "/calendar/2026-05-02", state: "default" },
  { day: 3, href: "/calendar/2026-05-03", state: "default" },
  { day: 4, href: "/calendar/2026-05-04", state: "default" },
  { day: 5, href: "/calendar/2026-05-05", state: "default" },
  { day: 6, href: "/calendar/2026-05-06", state: "default" },
  { day: 7, href: "/calendar/2026-05-07", state: "default" },
  { day: 8, href: "/calendar/2026-05-08", state: "default" },
  { day: 9, href: "/calendar/2026-05-09", state: "default" },
  { day: 10, href: "/calendar/2026-05-10", state: "default" },
  { day: 11, href: "/calendar/2026-05-11", state: "default" },
  { day: 12, href: "/calendar/2026-05-12", state: "default" },
  {
    day: 13,
    href: "/calendar/2026-05-13",
    state: "available",
    schedules: [
      { time: "13:00", name: "성수 아트 라운지", note: "브랜드 쇼케이스 예약 가능", status: "가능" },
      { time: "16:30", name: "연남 포토 살롱", note: "촬영형 팝업 상담 진행", status: "가능" },
    ],
  },
  { day: 14, href: "/calendar/2026-05-14", state: "default" },
  { day: 15, href: "/calendar/2026-05-15", state: "default" },
  { day: 16, href: "/calendar/2026-05-16", state: "closed" },
  { day: 17, href: "/calendar/2026-05-17", state: "default" },
  { day: 18, href: "/calendar/2026-05-18", state: "default" },
  { day: 19, href: "/calendar/2026-05-19", state: "default" },
  { day: 20, href: "/calendar/2026-05-20", state: "default" },
  {
    day: 21,
    href: "/calendar/2026-05-21",
    state: "available",
    schedules: [
      { time: "13:00", name: "성수 아트 라운지", note: "브랜드 쇼케이스 예약 가능", status: "가능" },
      { time: "16:30", name: "연남 포토 살롱", note: "촬영형 팝업 상담 진행", status: "가능" },
      { time: "19:00", name: "한남 라이브 갤러리", note: "야간 전시 세팅 완료", status: "가능" },
    ],
  },
  { day: 22, href: "/calendar/2026-05-22", state: "default" },
  { day: 23, href: "/calendar/2026-05-23", state: "default" },
  { day: 24, href: "/calendar/2026-05-24", state: "closed" },
  { day: 25, href: "/calendar/2026-05-25", state: "default" },
  { day: 26, href: "/calendar/2026-05-26", state: "default" },
  { day: 27, href: "/calendar/2026-05-27", state: "default" },
  { day: 28, href: "/calendar/2026-05-28", state: "default" },
  { day: 29, href: "/calendar/2026-05-29", state: "default" },
  { day: 30, href: "/calendar/2026-05-30", state: "default" },
  { day: 31, href: "/calendar/2026-05-31", state: "default" },
];

export function getCalendarDate(slug: string) {
  const found = calendarDays.find((item) => item.href.split("/").pop() === slug);
  if (!found) {
    return null;
  }

  return found;
}
