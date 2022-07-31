import { retrieveAccessToken } from "../server";
import { LandingPage } from "../views/LandingPage";
import { ProfileView } from "../views/ProfileView";

export default function Home() {
  const accessToken = retrieveAccessToken();
  return accessToken ? <ProfileView /> : <LandingPage />;
}
