import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainTemplate } from "../../components";
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
          <div className="flex flex-col gap-y-4 items-center br4-skeleton"></div>
        ) : sub ? (
          <SubscriptionDetailView subscription={sub} />
        ) : (
          <EmptyVideoPage />
        )}
      </div>
    </MainTemplate>
  );
}
