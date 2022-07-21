import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { User } from "../model/User";
import { getGoogleUser } from "../server/endpoints";

type TabType = {
  title: string;
  icon: ReactNode;
  link: string;
};

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
      title: "Explore",
      icon: <FaRegCompass className="text-white" />,
      link: "/explore",
    },
    {
      title: "Subscriptions",
      icon: <FaSubscript className="text-white" />,
      link: "/subscriptions",
    },
  ];
  const currentTab = tabs.find((tab) => tab.link.includes(pathname));
  return (
    <main className="flex">
      <SidePanel tabs={tabs} currentTab={currentTab ?? tabs[0]} />
      <section className="flex bg-gray-800 ml-28 flex-col">
        <TopBar />
        {children}
      </section>
    </main>
  );
}

type SidePanelProps = {
  tabs: TabType[];
  currentTab: TabType;
};

function SidePanel(props: SidePanelProps) {
  const { tabs, currentTab } = props;
  return (
    <div className="flex flex-col bg-gray-900 w-28 fixed h-screen justify-center">
      {tabs.map((tab) => (
        <Button
          key={tab.title}
          link={tab.link}
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
  const [user, setUser] = useState<User>();
  const getUserData = async () => {
    const data = await getGoogleUser();
    setUser({
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    });
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex items-center border-b-2 bg-gray-800 py-2 px-4 justify-between w-[93vw] ">
      <div className="flex items-center space-x-1 font-semibold text-white text-base ">
        <FaYoutube className="text-5xl text-red-600" /> Youtube
      </div>
      <SearchInput
        className="text-white rounded w-96 bg-gray-700"
        onChange={setSearch}
        value={search}
      />
      <Avatar alt="Remy Sharp" src={user?.picture ?? ""} />
    </div>
  );
}
