import dayjs from "dayjs";
import { Subscription } from "../model/Subscription";

export function SubscriptionDetailView({
  subscription,
}: {
  subscription: Subscription;
}) {
  const dateSubscript = dayjs(subscription?.subscriptAt).format("DD/MM/YYYY");
  return (
    <div className="flex flex-col w-1/3 items-center gap-y-4">
      <img
        className="rounded-full"
        src={subscription.thumbnail.url}
        height="40%"
        width="40%"
      />
      <div className="font-semibold text-4xl text-white">
        {subscription.title}
      </div>
      <div className="space-x-2 text-white flex items-center">
        <div>{subscription.description}</div>
      </div>
      <div className="space-x-2 text-white flex items-center">
        <div>Subscribed at:</div>
        <div>{dateSubscript}</div>
      </div>
    </div>
  );
}
