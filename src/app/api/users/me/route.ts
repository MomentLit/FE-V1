import axios from "axios";
import { NextResponse } from "next/server";

type UpdateCurrentUserBody = {
  name?: string | null;
  image_url?: string | null;
};

function handleUpstreamError(error: unknown) {
  if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
    console.error("Current user upstream request timed out", {
      message: error.message,
    });

    return NextResponse.json(
      { error: "UPSTREAM_SERVICE_TIMEOUT" },
      { status: 504 },
    );
  }

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

export async function GET(request: Request) {
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
    return handleUpstreamError(error);
  }
}

export async function PATCH(request: Request) {
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

  const body = parsedBody as UpdateCurrentUserBody;
  const payload: UpdateCurrentUserBody = {};

  if ("name" in body && (typeof body.name === "string" || body.name === null)) {
    payload.name = body.name;
  }

  if (
    "image_url" in body &&
    (typeof body.image_url === "string" || body.image_url === null)
  ) {
    payload.image_url = body.image_url;
  }

  if (!("name" in payload) && !("image_url" in payload)) {
    return NextResponse.json(
      { message: "At least one editable profile field is required." },
      { status: 400 },
    );
  }

  try {
    const response = await axios.patch(
      `${baseUrl.replace(/\/$/, "")}/users/me`,
      payload,
      {
        headers: {
          Accept: "application/json",
          Authorization: authorization,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      },
    );

    if (response.status === 204 || response.data == null || response.data === "") {
      return new Response(null, { status: response.status });
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return handleUpstreamError(error);
  }
}
