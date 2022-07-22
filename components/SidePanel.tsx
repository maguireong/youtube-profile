import classNames from "classnames";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Button } from "./Button";

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
  return (
    <div className="flex flex-col bg-gray-900 w-28 fixed h-screen justify-center">
      {tabs.map((tab) => (
        <Button
          key={tab.title}
          click={() =>
            router.push(
              {
                pathname: tab.link,
              },
              undefined,
              { shallow: true }
            )
          }
          className={classNames(
            currentTab?.title === tab.title ? "border-l-4 border-red-600" : "",
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
