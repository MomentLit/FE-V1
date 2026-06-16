import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const baseUrl = process.env.SPACES_API_BASE;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return NextResponse.json(
      { message: "code query parameter is required." },
      { status: 400 },
    );
  }

  const target = new URL(`${baseUrl.replace(/\/$/, "")}/auth/oauth/google/callback`);
  target.searchParams.set("code", code);

  if (state) {
    target.searchParams.set("state", state);
  }

  const response = await fetch(target, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  }

  const text = await response.text();
  return new Response(text || null, { status: response.status });
}
