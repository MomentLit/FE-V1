import axios from "axios";

export type CurrentUser = {
  image_url: string | null;
  email: string;
  name: string;
  created_at: string;
};

type CurrentUserResponse = {
  message: string;
  data: CurrentUser;
};

export type UpdateCurrentUserInput = {
  name: string | null;
  image_url: string | null;
};

const CURRENT_USER_KEY = "momentlit.currentUser";
export const ACCESS_TOKEN_KEY = "accessToken";
export const LEGACY_ACCESS_TOKEN_KEY = "access_token";
export const COMMON_ACCESS_TOKEN_KEY = "common.accessToken";
export const SESSION_ACCESS_TOKEN_KEY = "map-5421-accessToken";
export const USER_TOKEN_KEY = "userToken";
const inFlightPromises = new Map<string, Promise<CurrentUser>>();

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  // Check the known storage keys while existing sessions migrate between formats.
  const sessionToken =
    window.sessionStorage.getItem(ACCESS_TOKEN_KEY) ??
    window.sessionStorage.getItem(SESSION_ACCESS_TOKEN_KEY);

  if (sessionToken) {
    return sessionToken;
  }

  return (
    window.localStorage.getItem(ACCESS_TOKEN_KEY) ??
    window.localStorage.getItem(COMMON_ACCESS_TOKEN_KEY) ??
    window.localStorage.getItem(LEGACY_ACCESS_TOKEN_KEY) ??
    window.localStorage.getItem(USER_TOKEN_KEY)
  );
}

export async function fetchCurrentUser() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  const existingPromise = inFlightPromises.get(accessToken);

  if (existingPromise) {
    return existingPromise;
  }

  const requestPromise = axios
    .get<CurrentUserResponse>("/api/users/me", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 5000,
    })
    .then((response) => {
      window.sessionStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(response.data.data),
      );

      return response.data.data;
    });

  inFlightPromises.set(accessToken, requestPromise);

  try {
    return await requestPromise;
  } finally {
    if (inFlightPromises.get(accessToken) === requestPromise) {
      inFlightPromises.delete(accessToken);
    }
  }
}

export async function updateCurrentUser(input: UpdateCurrentUserInput) {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  await axios.patch("/api/users/me", input, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    timeout: 20000,
  });

  return fetchCurrentUser();
}

export function getCachedCurrentUser() {
  const cachedUser = window.sessionStorage.getItem(CURRENT_USER_KEY);

  if (!cachedUser) {
    return null;
  }

  try {
    return JSON.parse(cachedUser) as CurrentUser;
  } catch {
    window.sessionStorage.removeItem(CURRENT_USER_KEY);
    return null;
  }
}

export function clearCachedCurrentUser() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(CURRENT_USER_KEY);
  }
}
