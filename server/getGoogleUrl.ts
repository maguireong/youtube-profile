import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from "../configs";

export default function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: GOOGLE_REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube.force-ssl",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

const id_token = getCookie("idToken");
const access_token = getCookie("accessToken");
const refresh_token = getCookie("refreshToken");

type GoogleUserResult = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

export async function getGoogleUser(): Promise<GoogleUserResult> {
  try {
    const { data } = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

type RefreshTokens = {
  access_token: string;
  id_token: string;
};

export async function refreshAccessToken() {
  const url = "https://www.googleapis.com/oauth2/v4/token";
  const params = {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token,
    grant_type: "refresh_token",
  };
  const { data } = await axios.post<RefreshTokens>(url, params);
  const { access_token: refreshedAccessToken, id_token: refreshedIdToken } =
    data;

  setCookie("idToken", refreshedIdToken, { maxAge: 9000 });
  setCookie("accessToken", refreshedAccessToken, { maxAge: 9000 });

  return;
}

export async function logout() {
  deleteCookie("idToken");
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  window.location.reload();
  return;
}
