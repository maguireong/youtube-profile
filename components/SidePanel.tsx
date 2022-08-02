import classNames from "classnames";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BsGithub } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { ClickArea } from "./ClickArea";

type TabType = {
  title: string;
  icon: ReactNode;
  link: string;
};

type SidePanelProps = {
  tabs: TabType[];
  currentTab?: TabType;
};

export function SidePanel(props: SidePanelProps) {
  const { tabs, currentTab } = props;
  const router = useRouter();
  const goToTab = (link: string) =>
    router.push(
      {
        pathname: link,
      },
      undefined,
      { shallow: true }
    );

  return (
    <div className="flex flex-col bg-black fixed h-screen justify-center">
      <ClickArea className="flex w-full" click="/">
        <FaYoutube
          size="40"
          className="top-8 absolute left-11 hover:cursor-pointer hover:text-white ease-in-out duration-200 flex justify-center items-center text-4xl text-youtubeRed"
        />
      </ClickArea>
      {tabs.map((tab) => (
        <ClickArea
          key={tab.title}
          click={() => goToTab(tab.link)}
          className={classNames(
            currentTab?.title === tab.title
              ? "border-red-600"
              : "border-black opacity-50",
            "hover:bg-gray-800 hover:border-red-600 hover:opacity-100",
            "flex font-light text-white flex-col border-l-4 p-4 items-center"
          )}
        >
          <span className="text-2xl font-light">{tab.icon}</span>
          <span className="text-sm">{tab.title}</span>
        </ClickArea>
      ))}
      <ClickArea
        className="flex w-full"
        click="https://github.com/maguireong/youtube-profile"
      >
        <BsGithub className="bottom-8 absolute left-11 hover:cursor-pointer hover:text-purple-300 ease-in-out duration-200 flex justify-center items-center text-4xl text-white" />
      </ClickArea>
    </div>
  );
}
