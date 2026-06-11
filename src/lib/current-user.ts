import axios from "axios";

export type CurrentUser = {
  image_url: string;
  email: string;
  name: string;
  created_at: string;
};

type CurrentUserResponse = {
  message: string;
  data: CurrentUser;
};

const CURRENT_USER_KEY = "momentlit.currentUser";
let inFlightPromise: Promise<CurrentUser> | null = null;

export function getAccessToken() {
  return (
    window.localStorage.getItem("accessToken") ??
    window.localStorage.getItem("access_token")
  );
}

export async function fetchCurrentUser() {
  if (inFlightPromise) {
    return inFlightPromise;
  }

  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  inFlightPromise = axios
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

  try {
    return await inFlightPromise;
  } finally {
    inFlightPromise = null;
  }
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
