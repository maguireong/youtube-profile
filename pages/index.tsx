import { retrieveAccessToken } from "../server";
import { LandingPage, ProfileView } from "../views";

export default function Home() {
  const accessToken = retrieveAccessToken();
  return accessToken ? <ProfileView /> : <LandingPage />;
}
