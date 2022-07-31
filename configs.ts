const isDevelopment = process.env.NODE_ENV === "development";
export const GOOGLE_CLIENT_ID =
  "1034281273215-1m50l65qceaeueuc3h0aepqbaepccod7.apps.googleusercontent.com";
export const GOOGLE_CLIENT_SECRET = "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";
export const GOOGLE_REDIRECT_URI = isDevelopment
  ? "http://localhost:3000/api/oauth2"
  : "";
export const PORT = "3000";

export const BASE_URL = isDevelopment ? "http://localhost:3000" : "";
