import axios from "axios";
import { NextResponse } from "next/server";

type CreateSpaceBody = {
  name?: string;
  description?: string | null;
  address?: string;
  thumbnail_url?: string;
  image_urls?: string[];
  price_per_hour?: number;
  category?: string;
  lat?: number;
  lng?: number;
};

function handleUpstreamError(error: unknown) {
  if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
    return NextResponse.json(
      { message: "상위 서버 요청 시간이 초과되었습니다." },
      { status: 504 },
    );
  }

  if (axios.isAxiosError(error) && error.response) {
    return NextResponse.json(error.response.data ?? {}, {
      status: error.response.status,
    });
  }

  return NextResponse.json(
    { message: "상위 서버와 통신할 수 없습니다." },
    { status: 502 },
  );
}

export async function POST(request: Request) {
  const baseUrl = process.env.SPACES_API_BASE;
  const authorization = request.headers.get("authorization");

  if (!baseUrl) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 },
    );
  }

  if (!authorization) {
    return NextResponse.json(
      { message: "Authorization header is missing." },
      { status: 401 },
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

  if (
    !parsedBody ||
    typeof parsedBody !== "object" ||
    Array.isArray(parsedBody)
  ) {
    return NextResponse.json(
      { message: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  const body = parsedBody as CreateSpaceBody;

  if (
    typeof body.name !== "string" ||
    typeof body.address !== "string" ||
    typeof body.thumbnail_url !== "string" ||
    !Array.isArray(body.image_urls) ||
    typeof body.price_per_hour !== "number" ||
    typeof body.category !== "string" ||
    typeof body.lat !== "number" ||
    typeof body.lng !== "number"
  ) {
    return NextResponse.json(
      { message: "필수 등록값이 부족합니다." },
      { status: 400 },
    );
  }

  try {
    const response = await axios.post(
      `${baseUrl.replace(/\/$/, "")}/spaces`,
      body,
      {
        headers: {
          Accept: "application/json",
          Authorization: authorization,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return handleUpstreamError(error);
  }
}
