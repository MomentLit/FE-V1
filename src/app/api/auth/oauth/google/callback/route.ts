import { NextRequest, NextResponse } from "next/server";

const OAUTH_STATE_COOKIE = "momentlit_google_oauth_state";
const UPSTREAM_TIMEOUT_MS = 10_000;

function clearStateCookie(response: NextResponse) {
  response.cookies.set(OAUTH_STATE_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function GET(request: NextRequest) {
  const baseUrl = process.env.SPACES_API_BASE;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 },
    );
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  if (!code) {
    return NextResponse.json(
      { message: "code query parameter is required." },
      { status: 400 },
    );
  }

  if (!state) {
    return NextResponse.json(
      { message: "state query parameter is required." },
      { status: 400 },
    );
  }

  if (!storedState || storedState !== state) {
    const response = NextResponse.json(
      { message: "Invalid OAuth state." },
      { status: 400 },
    );
    clearStateCookie(response);
    return response;
  }

  const target = new URL(`${baseUrl.replace(/\/$/, "")}/auth/oauth/google/callback`);
  target.searchParams.set("code", code);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(target, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      const proxyResponse = NextResponse.json(data, { status: response.status });
      clearStateCookie(proxyResponse);
      return proxyResponse;
    }

    const text = await response.text();
    const proxyResponse = new NextResponse(text || null, { status: response.status });
    clearStateCookie(proxyResponse);
    return proxyResponse;
  } catch {
    const status = controller.signal.aborted ? 504 : 502;
    const response = NextResponse.json(
      {
        message: controller.signal.aborted
          ? "구글 로그인 서버 요청이 시간 초과되었습니다."
          : "구글 로그인 서버에 연결할 수 없습니다.",
      },
      { status },
    );
    clearStateCookie(response);
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}
