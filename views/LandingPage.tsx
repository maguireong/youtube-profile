import { FaYoutube } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../components/Button";
import getGoogleOAuthURL from "../server/getGoogleUrl";

export function LandingPage() {
  const link = getGoogleOAuthURL();
  return (
    <main className="flex flex-col h-screen bg-youtubeRed items-center justify-center">
      <FaYoutube size="200px" className="text-5xl text-white" />

      <Button
        className="rounded-full bg-youtubeBlack flex items-center space-x-2 px-6 py-3"
        link={link}
      >
        <FcGoogle size="25px" />
        <div className="font-medium text-white">Continue with Google</div>
      </Button>
    </main>
  );
}
