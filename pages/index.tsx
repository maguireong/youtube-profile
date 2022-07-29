import Cookies from "js-cookie";
import { useEffect } from "react";
import { refreshAccessToken } from "../server";
import { LandingPage } from "../views/LandingPage";
import { ProfileView } from "../views/ProfileView";

export default function Home() {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  useEffect(() => {
    if (!accessToken && refreshToken) refreshAccessToken();
  }, []);

  return accessToken ? <ProfileView /> : <LandingPage />;
}
