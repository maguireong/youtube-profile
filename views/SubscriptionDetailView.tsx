import classNames from "classnames";
import dayjs from "dayjs";
import { Subscription } from "../model";
import { useWindowWidth } from "../useWindowWidth";

export function SubscriptionDetailView({
  subscription,
}: {
  subscription: Subscription;
}) {
  const isMobileView = useWindowWidth() < 1290;
  const dateSubscript = dayjs(subscription?.subscriptAt).format("DD/MM/YYYY");

  return (
    <div
      className={classNames(
        isMobileView ? "" : " w-1/3",
        "flex flex-col text-center items-center gap-y-4"
      )}
    >
      <img
        className="rounded-full"
        alt="Subcription thumbnail"
        src={subscription.thumbnail.url}
        height="40%"
        width="40%"
      />
      <div
        className={classNames(
          isMobileView ? "text-2xl" : "text-4xl",
          "font-semibold  text-white"
        )}
      >
        {subscription.title}
      </div>
      <div
        className={classNames(
          isMobileView ? "text-sm" : "",
          "text-white flex items-center"
        )}
      >
        <div>{subscription.description}</div>
      </div>
      <div
        className={classNames(
          isMobileView ? "text-sm" : "",
          "space-x-2 text-white flex items-center"
        )}
      >
        <div>Subscribed at:</div>
        <div>{dateSubscript}</div>
      </div>
    </div>
  );
}
