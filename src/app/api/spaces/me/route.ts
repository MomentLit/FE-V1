import { NextResponse } from "next/server";

function upstreamBase() {
  const baseUrl = process.env.SPACES_API_BASE;

  if (!baseUrl) {
    return null;
  }

  return baseUrl.replace(/\/$/, "");
}

async function proxyJson(url: string, authorization: string | null) {
  if (!authorization) {
    return NextResponse.json(
      { message: "Authorization header is missing." },
      { status: 401 },
    );
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: authorization,
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

export async function GET(request: Request) {
  const baseUrl = upstreamBase();

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 },
    );
  }

  return proxyJson(`${baseUrl}/spaces/me`, request.headers.get("authorization"));
}
