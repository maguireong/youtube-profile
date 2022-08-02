export const isDevelopment = process.env.ENV === "development";
export const NODE_ENV = process.env.ENV;
export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ??
  "1034281273215-1m50l65qceaeueuc3h0aepqbaepccod7.apps.googleusercontent.com";
export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ?? "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";
export const GOOGLE_REDIRECT_URI = isDevelopment
  ? process.env.GOOGLE_REDIRECT_URI
  : "https://youtube-profile.herokuapp.com/api/oauth2";
export const PORT = "3000";
export const BASE_URL = isDevelopment
  ? process.env.BASE_URL
  : "https://youtube-profile.herokuapp.com";
