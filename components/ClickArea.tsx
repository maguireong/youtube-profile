import classNames from "classnames";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Click = {
  click: (() => void) | string;
  className?: string;
  children: ReactNode;
};

export function ClickArea({ className, click, children }: Click) {
  const router = useRouter();
  const onClick =
    typeof click === "function"
      ? click
      : () =>
          router.push(
            {
              pathname: click,
            },
            undefined,
            { shallow: true }
          );
  return (
    <button
      className={classNames(className, "ease-in-out duration-200")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
