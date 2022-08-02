import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainTemplate, Shimmer } from "../../components";
import { Subscription } from "../../model";
import { EmptyVideoPage, SubscriptionDetailView } from "../../views";
import { getSubscriptionData } from "../../youtube";

export default function SubscriptionDetail() {
  const router = useRouter();
  const id = String(router.query.id);
  const [sub, setSub] = useState<Subscription | "loading">();

  useEffect(() => {
    const getSubscriptions = async () => {
      const subscriptionData = await getSubscriptionData({ id });
      setSub(Array.isArray(subscriptionData) ? undefined : subscriptionData);
    };
    getSubscriptions();
  }, [id]);

  return (
    <MainTemplate>
      <div className="h-screen w-full flex items-center justify-center">
        {sub === "loading" ? (
          <div className="animate-pulse flex flex-col justify-center items-center space-y-4">
            <Shimmer rounded className="w-44 h-44" />
            <Shimmer className="h-6 w-36 rounded-md" />
            <Shimmer className="h-14 w-60 rounded-md" />
            <Shimmer className="h-4 w-28 rounded-md" />
          </div>
        ) : sub ? (
          <SubscriptionDetailView subscription={sub} />
        ) : (
          <EmptyVideoPage />
        )}
      </div>
    </MainTemplate>
  );
}
