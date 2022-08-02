import { useRouter } from "next/router";
import { FaYoutube } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getGoogleOAuthURL } from "../server";

export function LandingPage() {
  const link = getGoogleOAuthURL();
  const router = useRouter();
  return (
    <main className="flex font-sans flex-col h-screen bg-youtubeRed items-center justify-center">
      <FaYoutube size="200px" className="text-5xl text-white" />

      <button
        className="rounded-full bg-youtubeBlack font-medium text-white hover:bg-white hover:text-youtubeBlack flex flex-row items-center space-x-2 px-6 py-3"
        onClick={() => router.push(link)}
      >
        <FcGoogle size="25px" />
        <span>Continue with Google</span>
      </button>
    </main>
  );
}
