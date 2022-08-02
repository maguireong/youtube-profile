import { ReactNode } from "react";
import { FaCompass, FaThumbsUp } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { MdSubscriptions } from "react-icons/md";
import { useRouter } from "next/router";
import Head from "next/head";
import { useShowPageTransitionLoader } from "../pageTransitions";
import { SidePanel } from "./SidePanel";
import classNames from "classnames";
import { BottomPanel } from "./BottomPanel";
import { useWindowWidth } from "../useWindowWidth";
import { Spinner } from "./Spinner";

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
    // {
    //   title: "Playlists",
    //   icon: <MdVideoLibrary />,
    //   link: "/playlists",
    // },
  ];
  const currentTab = tabs.find((tab) => tab.link.includes(pathname));
  const showPageTransitionLoader = useShowPageTransitionLoader();
  const isMobileView = useWindowWidth() < 1290;
  return (
    <>
      <Head>
        <title>Youtube Profile</title>
        <link
          rel="icon"
          href="https://www.youtube.com/s/desktop/54c586d4/img/favicon.ico"
        />
      </Head>

      <main className="-mb-8 font-sans min-h-screen bg-youtubeBlack">
        {!isMobileView && <SidePanel tabs={tabs} currentTab={currentTab} />}
        {showPageTransitionLoader ? (
          <div className="flex h-screen w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className={classNames(isMobileView ? "" : "ml-32")}>
              {children}
            </div>
            {isMobileView && (
              <BottomPanel tabs={tabs} currentTab={currentTab} />
            )}
          </>
        )}
      </main>
    </>
  );
}
