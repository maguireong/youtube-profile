import { Button as BluePrintButton } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

const kindStyles = {
  login: <FcGoogle size="25px" />,
};

type Kind = keyof typeof kindStyles;

type ButtonProps = {
  text?: string;
  click: (() => void) | string;
  className?: string;
  kind?: Kind;
};

export function Button(props: ButtonProps) {
  const { text, kind, click, className } = props;
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
  const kindIcon = kind ? kindStyles[kind] : null;

  return (
    <BluePrintButton className={className} onClick={onClick}>
      <div className="flex w-fit gap-2">
        <div>{kindIcon}</div> {text}
      </div>
    </BluePrintButton>
  );
}
