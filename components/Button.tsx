import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { ClickArea } from "./ClickArea";

const kindStyles = {
  login: <FcGoogle size="25px" />,
};

type Kind = keyof typeof kindStyles;

type ButtonProps = {
  text?: string;
  click: string | (() => void);
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
    <ClickArea className={className} click={onClick}>
      {kindIcon ? (
        <div className="flex ease-in-out duration-200 w-fit gap-2">
          <div>{kindIcon}</div> {text}
        </div>
      ) : (
        text
      )}
    </ClickArea>
  );
}
