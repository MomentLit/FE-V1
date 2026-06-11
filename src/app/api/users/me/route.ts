import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const baseUrl =
    process.env.SPACES_API_BASE ?? process.env.NEXT_PUBLIC_API_BASE;
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

  try {
    const response = await axios.get(
      `${baseUrl.replace(/\/$/, "")}/users/me`,
      {
        headers: {
          Accept: "application/json",
          Authorization: authorization,
        },
        timeout: 3000,
      },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Current user upstream request failed", {
        message: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
      });

      return NextResponse.json(
        { error: "UPSTREAM_SERVICE_ERROR" },
        { status: error.response.status },
      );
    }

    console.error("Current user upstream request failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { error: "UPSTREAM_SERVICE_UNAVAILABLE" },
      { status: 502 },
    );
  }
}
