import classNames from "classnames";
import { ReactNode, useState } from "react";
import {
  FaHome,
  FaRegCompass,
  FaSubscript,
  FaPersonBooth,
  FaYoutube,
} from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";
import { Avatar } from "@mui/material";

type TabType = {
  title: string;
  icon: ReactNode;
};

export function MainTemplate({ children }: { children: ReactNode }) {
  const tabs = [
    {
      title: "Home",
      icon: <BsFillPersonFill className="text-white" />,
    },
    {
      title: "Explore",
      icon: <FaRegCompass className="text-white" />,
    },
    {
      title: "Subscriptions",
      icon: <FaSubscript className="text-white" />,
    },
  ];

  const [currentTab, setCurrentTab] = useState<TabType>(tabs[0]);
  return (
    <main className="flex ">
      <SidePanel
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <section className="flex flex-col">
        <TopBar />
        {children}
      </section>
    </main>
  );
}

type SidePanelProps = {
  tabs: TabType[];
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
};

function SidePanel(props: SidePanelProps) {
  const { tabs, currentTab, setCurrentTab } = props;
  return (
    <div className="flex flex-col bg-gray-900 w-28 h-screen justify-center">
      {tabs.map((tab) => (
        <Button
          click={() => setCurrentTab(tab)}
          className={classNames(
            currentTab.title === tab.title ? "border-l-4 border-red-600" : "",
            "hover:bg-gray-800 hover:border-l-4 border-red-600",
            "flex font-light text-white flex-col py-4 items-center"
          )}
        >
          <span className="text-2xl font-light">{tab.icon}</span>
          <span className="text-sm">{tab.title}</span>
        </Button>
      ))}
    </div>
  );
}

function TopBar() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-center bg-gray-900 py-2 justify-between w-[94vw] px-4">
      <div className="flex items-center space-x-1 font-semibold text-white text-base ">
        <FaYoutube className="text-5xl text-red-600 " /> Youtube
      </div>
      <SearchInput
        className="text-white rounded w-96 bg-gray-700"
        onChange={setSearch}
        value={search}
      />
      <div>
        <Avatar alt="Remy Sharp" src="/avatar/1.jpg" />
      </div>
    </div>
  );
}
