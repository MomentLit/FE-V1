import { redirect } from "next/navigation";

export default async function CalendarSelectedDatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  redirect(`/calendar/selected?date=${date}`);
}
