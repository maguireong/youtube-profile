import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import qs from "qs";
import { setCookie } from "cookies-next";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const BASE_URL = process.env.BASE_URL;

type GoogleTokensResult = {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
};

async function getGoogleOAuthTokens({ code }: { code: string }) {
  const url = "https://oauth2.googleapis.com/token";
  console.log("getting tokens", GOOGLE_REDIRECT_URI);

  const values = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const res = axios.post<GoogleTokensResult>(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return (await res).data;
  } catch (error) {
    console.log(error, "Failed to authorize Google user");
    throw new Error("Failed to authorize google user");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = String(req.query.code);
  const domain = BASE_URL;
  if (!domain) throw new Error("No base domain in .env");
  try {
    // get the requied token using the code
    const data = await getGoogleOAuthTokens({ code });
    console.log("got tokens");
    const { id_token, refresh_token, access_token } = data;

    setCookie("idToken", id_token, { req, res, maxAge: 9000 });
    setCookie("accessToken", access_token, { req, res, maxAge: 9000 });
    setCookie("refreshToken", refresh_token, { req, res, maxAge: 3.154e10 });

    return res.redirect(domain);
  } catch (error) {
    console.log(error, "Failed to authorize Google user");
    return res.redirect(`${domain}/error`);
  }
}
