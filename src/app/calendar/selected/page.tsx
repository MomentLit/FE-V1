import { CalendarView } from "../CalendarView";

export default async function CalendarSelectedPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;

  return <CalendarView selectedDate={params.date} />;
}