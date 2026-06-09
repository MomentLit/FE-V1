import { redirect } from "next/navigation";

export default async function CalendarSelectedDatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const query = new URLSearchParams({ date }).toString();
  redirect(`/calendar/selected?${query}`);
}
