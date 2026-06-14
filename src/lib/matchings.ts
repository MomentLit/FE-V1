import axios from "axios";
import { getAccessToken } from "@/lib/current-user";

export type MatchingStatus = "APPROVED" | "REJECTED" | "REQUESTED" | string;

export type Matching = {
  matching_id: number;
  address: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: MatchingStatus;
  created_at: string;
};

type MatchingsResponse = {
  message: string;
  data: {
    matchings: Matching[];
  };
};

export type ReceivedMatching = Matching;

const receivedInFlightPromises = new Map<string, Promise<Matching[]>>();
const sentInFlightPromises = new Map<string, Promise<Matching[]>>();

async function fetchMatchings(
  endpoint: string,
  inFlightPromises: Map<string, Promise<Matching[]>>,
) {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  const existingPromise = inFlightPromises.get(accessToken);

  if (existingPromise) {
    return existingPromise;
  }

  const requestPromise = axios
    .get<MatchingsResponse>(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 20000,
    })
    .then((response) =>
      Array.isArray(response.data?.data?.matchings)
        ? response.data.data.matchings
        : [],
    );

  inFlightPromises.set(accessToken, requestPromise);

  try {
    return await requestPromise;
  } finally {
    if (inFlightPromises.get(accessToken) === requestPromise) {
      inFlightPromises.delete(accessToken);
    }
  }
}

export async function fetchReceivedMatchings() {
  return fetchMatchings("/api/matchings/received", receivedInFlightPromises);
}

export async function fetchSentMatchings() {
  return fetchMatchings("/api/matchings/me", sentInFlightPromises);
}
