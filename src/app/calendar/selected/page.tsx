import { CalendarView } from "../CalendarView";

export default async function CalendarSelectedPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedDate = Array.isArray(params.date) ? params.date[0] : params.date;

  return <CalendarView selectedDate={selectedDate} />;
}
