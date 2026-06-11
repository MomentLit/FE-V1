import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  calendarDays,
  calendarLeadingEmptyCells,
  calendarMonthLabel,
  type CalendarDate,
  type CalendarSchedule,
} from "./calendar-data";

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getDateClasses(state: CalendarDate["state"], selected: boolean) {
  if (selected) {
    return "bg-[#00ADB5] text-white";
  }

  if (state === "available") {
    return "bg-[#E8F6F7] text-[#00ADB5]";
  }

  if (state === "closed") {
    return "bg-[#F0F3F6] text-[#99A1B1]";
  }

  return "bg-white text-[#222831]";
}

function ScheduleCard({ item }: { item: CalendarSchedule }) {
  return (
    <article className="flex flex-col gap-2 rounded-[16px] bg-[#F8FBFB] p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] font-bold text-[#67728A]">{item.time}</span>
        <span className="rounded-full bg-[#E8F6F7] px-2 py-1 text-[11px] font-bold text-[#00ADB5]">
          {item.status}
        </span>
      </div>
      <h3 className="text-[15px] font-bold text-[#222831]">{item.name}</h3>
      <p className="text-[12px] font-medium text-[#5E687E]">{item.note}</p>
    </article>
  );
}

export function CalendarView({
  selectedDate,
}: {
  selectedDate?: string;
}) {
  const selected = selectedDate ? calendarDays.find((item) => item.href.endsWith(selectedDate)) : null;
  const scheduleDate = selectedDate?.replaceAll("-", ".") ?? calendarDays[20]?.href.split("/").pop()?.replaceAll("-", ".") ?? "";
  const scheduleItems = selected?.schedules ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7FBFB]">
      <Header />

      <main className="mx-auto mt-8 mb-20 flex w-full max-w-[1500px] flex-1 flex-col gap-6 px-8">
        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-bold text-[#00ADB5]">MOMENTLIT CALENDAR</p>
          <h1 className="text-[44px] font-bold leading-none text-[#222831]">캘린더</h1>
        </section>

        {selected ? (
          <section className="flex items-start gap-6">
            <div className="min-w-0 flex-1 rounded-[24px] bg-white p-8">
              <CalendarGrid selectedDate={selectedDate} compact />
            </div>

            <aside className="flex w-[390px] flex-col gap-3 rounded-[24px] border border-[#DDEEEF] bg-white p-6">
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[11px] font-bold text-[#00ADB5]">{scheduleDate}</p>
                <h2 className="text-[22px] font-bold text-[#222831]">잡힌 일정</h2>
              </div>

              <div className="flex flex-col gap-3">
                {scheduleItems.map((item) => (
                  <ScheduleCard item={item} key={`${item.time}-${item.name}`} />
                ))}
              </div>
            </aside>
          </section>
        ) : (
          <section className="rounded-[24px] bg-white p-8">
            <CalendarGrid />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function CalendarGrid({ compact = false, selectedDate }: { compact?: boolean; selectedDate?: string }) {
  const boxClasses = compact
    ? "rounded-[22px] bg-[#F8FBFB] p-7"
    : "rounded-[26px] bg-[#F8FBFB] p-9";
  const columnGap = compact ? "gap-[13px]" : "gap-[15px]";
  const titleClasses = compact ? "text-[28px]" : "text-[30px]";
  const weekGap = compact ? "gap-[11px]" : "gap-[11px]";
  const weekdayCell = compact
    ? "h-[46px] rounded-[11px] text-[14px]"
    : "h-[52px] rounded-[11px] text-[15px]";
  const dateCell = compact
    ? "h-[72px] rounded-[12px] text-[17px]"
    : "h-[84px] rounded-[12px] text-[18px]";

  return (
    <div className={`flex flex-col ${columnGap} ${boxClasses}`}>
      <div className="flex items-center">
        <h2 className={`${titleClasses} font-bold text-[#222831]`}>{calendarMonthLabel}</h2>
      </div>

      <div className={`grid grid-cols-7 ${weekGap}`}>
        {weekdays.map((day) => (
          <div
            className={`grid place-items-center bg-white font-mono font-bold text-[#67728A] ${weekdayCell}`}
            key={day}
          >
            {day}
          </div>
        ))}

        {Array.from({ length: calendarLeadingEmptyCells }).map((_, index) => (
          <div className={`grid place-items-center bg-white font-semibold text-[#222831] ${dateCell}`} key={`empty-${index}`} />
        ))}

        {calendarDays.map((item) => {
          const selected = selectedDate ? item.href.endsWith(selectedDate) : false;

          return (
            <Link
              className={`grid place-items-center font-semibold transition ${dateCell} ${getDateClasses(item.state, selected)}`}
              href={`/calendar/selected?date=${item.href.split("/").pop()}`}
              key={item.href}
            >
              {item.day}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-3">
        <span className="flex items-center gap-1.5 text-[14px] font-medium text-[#5E687E]">
          <i className="h-1.5 w-1.5 rounded-full bg-[#00ADB5]" />
          예약 가능
        </span>
        <span className="flex items-center gap-1.5 text-[14px] font-medium text-[#5E687E]">
          <i className="h-1.5 w-1.5 rounded-full bg-[#D0D3DB]" />
          마감/휴무
        </span>
      </div>
    </div>
  );
}
