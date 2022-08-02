import classNames from "classnames";

type ShimmerProps = {
  className?: string;
  rounded?: boolean;
};

export function Shimmer(props: ShimmerProps) {
  const { className, rounded } = props;
  return rounded ? (
    <div
      className={classNames(
        className,
        "animate-pulse rounded-full bg-slate-700 h-10 w-10"
      )}
    ></div>
  ) : (
    <div className={classNames(className, "animate-pulse bg-slate-700")}></div>
  );
}
