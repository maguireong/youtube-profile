import { FaYoutube } from "react-icons/fa";
import { ClickArea } from "../components";
export function EmptyVideoPage() {
  return (
    <div className="h-screen text-white w-full flex flex-col space-y-2 mt-40 items-center">
      <div className="text-lg font-semibold">No videos found</div>
      <ClickArea
        className="flex items-center hover:text-youtubeRed hover:cursor-pointer hover:underline text-2xl space-x-4"
        click="https://www.youtube.com"
      >
        <h1>Go watch some</h1>
        <FaYoutube size="45" className="" />
      </ClickArea>
    </div>
  );
}
