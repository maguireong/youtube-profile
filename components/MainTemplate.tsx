import { ReactNode } from "react";
import { FaCompass, FaThumbsUp } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { MdVideoLibrary, MdSubscriptions } from "react-icons/md";
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
      icon: <BsFillPersonFill />,
      link: "/",
    },
    {
      title: "Likes",
      icon: <FaThumbsUp />,
      link: "/likes",
    },
    {
      title: "Subscriptions",
      icon: <MdSubscriptions />,
      link: "/subscriptions",
    },
    {
      title: "Explore",
      icon: <FaCompass />,
      link: "/explore",
    },
    {
      title: "Playlists",
      icon: <MdVideoLibrary />,
      link: "/playlists",
    },
  ];
  const currentTab = tabs.find((tab) => tab.link.includes(pathname));
  const showPageTransitionLoader = useShowPageTransitionLoader();
  return (
    <>
      <Head>
        <title>{currentTab?.title} - Youtube Profile</title>
        <link rel="icon" href="/youtube.ico" />
      </Head>

      <main className="-mb-8 bg-youtubeBlack">
        <SidePanel tabs={tabs} currentTab={currentTab} />

        {showPageTransitionLoader ? (
          <div className="flex space-x-2 text-youtubeRed h-screen w-full items-center justify-center">
            <CircularProgress className="text-youtubeRed" color="secondary" />
            <div>Loading</div>
          </div>
        ) : (
          children
        )}
      </main>
    </>
  );
}
