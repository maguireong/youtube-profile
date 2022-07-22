import { ReactNode } from "react";
import { FaRegCompass, FaThumbsUp } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineVideoLibrary, MdSubscriptions } from "react-icons/md";
import { useRouter } from "next/router";
import { SidePanel } from "./SidePanel";
import Head from "next/head";
import { useShowPageTransitionLoader } from "../pageTransitions";
import { CircularProgress } from "@mui/material";

export function MainTemplate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = router.pathname;
  const tabs = [
    {
      title: "Home",
      icon: <BsFillPersonFill className="text-white" />,
      link: "/",
    },
    {
      title: "Likes",
      icon: <FaThumbsUp className="text-white" />,
      link: "/likes",
    },
    {
      title: "Subscriptions",
      icon: <MdSubscriptions className="text-white" />,
      link: "/subscriptions",
    },
    {
      title: "Activities",
      icon: <FaRegCompass className="text-white" />,
      link: "/activities",
    },
    {
      title: "Playlists",
      icon: <MdOutlineVideoLibrary className="text-white" />,
      link: "/playlists",
    },
  ];
  const currentTab = tabs.find((tab) => tab.link.includes(pathname));
  const showPageTransitionLoader = useShowPageTransitionLoader();
  return (
    <>
      <Head>
        <title>Youtube Profile</title>
        <link rel="icon" href="/youtube.ico" />
      </Head>

      <main className="flex bg-youtubeBlack">
        <SidePanel tabs={tabs} currentTab={currentTab} />
        <div className="ml-28">
          {showPageTransitionLoader ? (
            <div className="flex space-x-2 text-youtubeRed h-screen w-full items-center justify-center">
              <CircularProgress className="text-youtubeRed" color="secondary" />
              <div>Loading</div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </>
  );
}
