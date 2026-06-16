import { NextResponse } from "next/server";

const UPSTREAM_TIMEOUT_MS = 10_000;

function upstreamBase() {
  const baseUrl = process.env.SPACES_API_BASE;

  if (!baseUrl) {
    return null;
  }

  return baseUrl.replace(/\/$/, "");
}

function upstreamError(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ spaceId: string }> },
) {
  const baseUrl = upstreamBase();
  const authorization = request.headers.get("authorization");

  if (!baseUrl) {
    return upstreamError("API base URL is not configured.", 500);
  }

  if (!authorization) {
    return upstreamError("Authorization header is missing.", 401);
  }

  const { spaceId } = await params;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${baseUrl}/spaces/${encodeURIComponent(spaceId)}/popups/history`,
      {
        headers: {
          Accept: "application/json",
          Authorization: authorization,
        },
        cache: "no-store",
        signal: controller.signal,
      },
    );

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const text = await response.text();
    return new Response(text || null, { status: response.status });
  } catch {
    return upstreamError(
      controller.signal.aborted
        ? "팝업 이력 서버 요청이 시간 초과되었습니다."
        : "팝업 이력 서버에 연결할 수 없습니다.",
      controller.signal.aborted ? 504 : 502,
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
