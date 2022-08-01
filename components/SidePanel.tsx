import classNames from "classnames";
import { useRouter } from "next/router";
import { ReactNode } from "react";
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
      {tabs.map((tab) => (
        <ClickArea
          key={tab.title}
          click={() => goToTab(tab.link)}
          className={classNames(
            currentTab?.title === tab.title && "border-red-600",
            currentTab?.title !== tab.title && "border-black",
            "hover:bg-gray-800 hover:border-red-600",
            "flex font-light text-white flex-col  border-l-4 p-4 items-center"
          )}
        >
          <span className="text-2xl font-light">{tab.icon}</span>
          <span className="text-sm">{tab.title}</span>
        </ClickArea>
      ))}
    </div>
  );
}
