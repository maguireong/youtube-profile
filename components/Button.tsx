import { ReactNode } from "react";

type ButtonProps = {
  text?: string;
  prependIcon?: ReactNode;
  link?: string;
  click?: () => void;
  className?: string;
  children?: ReactNode;
};

export function Button(props: ButtonProps) {
  const { text, link, prependIcon, click, className, children } = props;
  return link ? (
    <a className={className} href={link}>
      {children ?? text}
    </a>
  ) : (
    <button className={className} onClick={click}>
      {children ?? (
        <div className="flex w-fit space-x-2">
          {prependIcon} {text}
        </div>
      )}
    </button>
  );
}
