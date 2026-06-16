import { NextResponse } from "next/server";

type SignInBody = {
  email?: string;
  password?: string;
};

const UPSTREAM_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  const baseUrl = process.env.SPACES_API_BASE;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 },
    );
  }

  let parsedBody: unknown;

  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
    return NextResponse.json(
      { message: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  const body = parsedBody as SignInBody;

  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const text = await response.text();
    return new Response(text || null, { status: response.status });
  } catch {
    return NextResponse.json(
      controller.signal.aborted
        ? { message: "로그인 서버 요청이 시간 초과되었습니다." }
        : { message: "로그인 서버에 연결할 수 없습니다." },
      { status: controller.signal.aborted ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
