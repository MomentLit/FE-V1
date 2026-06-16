import axios from "axios";
import { NextResponse } from "next/server";

type SignUpBody = {
  name?: string;
  email?: string;
  password?: string;
};

function handleUpstreamError() {
  return NextResponse.json(
    { message: "회원가입 서버에 연결할 수 없습니다." },
    { status: 502 },
  );
}

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

  const body = parsedBody as SignUpBody;

  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json(
      { message: "Name, email and password are required." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        password: body.password,
      }),
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const text = await response.text();
    return new Response(text || null, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data ?? { message: "회원가입에 실패했습니다." },
        { status: error.response.status },
      );
    }

    return handleUpstreamError();
  }
}
