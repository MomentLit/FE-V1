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

function getAccessToken() {
  return (
    window.localStorage.getItem("accessToken") ??
    window.localStorage.getItem("access_token")
  );
}

export async function fetchCurrentUser() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  const response = await axios.get<CurrentUserResponse>("/api/users/me", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    timeout: 5000,
  });

  window.sessionStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(response.data.data),
  );

  return response.data.data;
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
