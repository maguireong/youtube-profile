import { ReactNode } from "react";
import { FaRegCompass, FaSubscript } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { SidePanel } from "./SidePanel";
import { TopBar } from "./Topbar";

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
    <main className="flex bg-gray-800">
      <SidePanel tabs={tabs} currentTab={currentTab ?? tabs[0]} />
      {children}
    </main>
  );
}
