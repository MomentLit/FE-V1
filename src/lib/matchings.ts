import axios from "axios";
import { getAccessToken } from "@/lib/current-user";

export type MatchingStatus = "APPROVED" | "REJECTED" | "REQUESTED" | string;

export type ReceivedMatching = {
  matching_id: number;
  address: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: MatchingStatus;
  created_at: string;
};

type ReceivedMatchingsResponse = {
  message: string;
  data: {
    matchings: ReceivedMatching[];
  };
};

const inFlightPromises = new Map<string, Promise<ReceivedMatching[]>>();

export async function fetchReceivedMatchings() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  const existingPromise = inFlightPromises.get(accessToken);

  if (existingPromise) {
    return existingPromise;
  }

  const requestPromise = axios
    .get<ReceivedMatchingsResponse>("/api/matchings/received", {
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
