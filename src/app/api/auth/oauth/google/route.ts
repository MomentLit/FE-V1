import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

const OAUTH_STATE_COOKIE = "momentlit_google_oauth_state";
const OAUTH_STATE_MAX_AGE_SECONDS = 300;

export async function GET() {
  const baseUrl = process.env.SPACES_API_BASE;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 },
    );
  }

  const state = randomBytes(32).toString("hex");
  const target = new URL(`${baseUrl.replace(/\/$/, "")}/auth/oauth/google`);
  target.searchParams.set("state", state);

  const response = NextResponse.redirect(target);
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: OAUTH_STATE_MAX_AGE_SECONDS,
  });

  return response;
}
