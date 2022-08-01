import classNames from "classnames";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { isDevelopment } from "../configs";

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

  return typeof click === "string" ? (
    <a
      className={classNames(className, "ease-in-out duration-200")}
      href={click}
      rel="noreferrer"
      target={isDevelopment ? "_blank" : "_self"}
    >
      {children}
    </a>
  ) : (
    <button
      className={classNames(className, "ease-in-out duration-200")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
