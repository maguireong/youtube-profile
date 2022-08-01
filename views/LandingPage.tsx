import { FaYoutube } from "react-icons/fa";
import { Button } from "../components";
import { getGoogleOAuthURL } from "../server";

export function LandingPage() {
  const link = getGoogleOAuthURL();
  return (
    <main className="flex flex-col h-screen bg-youtubeRed items-center justify-center">
      <FaYoutube size="200px" className="text-5xl text-white" />

      <Button
        className="rounded-full bg-youtubeBlack font-medium text-white hover:bg-white hover:text-youtubeBlack flex flex-row items-center space-x-2 px-6 py-3"
        click={link}
        kind="login"
        text="Continue with Google"
      />
    </main>
  );
}
