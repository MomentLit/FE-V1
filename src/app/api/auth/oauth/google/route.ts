import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const baseUrl = process.env.SPACES_API_BASE;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const target = new URL(`${baseUrl.replace(/\/$/, "")}/auth/oauth/google`);

  if (state) {
    target.searchParams.set("state", state);
  }

  return NextResponse.redirect(target);
}
