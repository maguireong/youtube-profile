import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainTemplate } from "../../components";
import { Subscription, useSubscription_Read } from "../../model";
import { SubscriptionDetailView } from "../../views";

export default function SubscriptionDetail() {
  const router = useRouter();
  const id = String(router.query.id);
  const [sub, setSub] = useState<Subscription | "loading">();

  useEffect(() => {
    const getSubscriptions = async () => {
      const subscriptionData = await useSubscription_Read({ id });
      setSub(Array.isArray(subscriptionData) ? undefined : subscriptionData);
    };
    getSubscriptions();
  }, [id]);

  return (
    <MainTemplate>
      <div className="h-screen w-full flex items-center justify-center">
        {sub === "loading" ? (
          <div className="flex flex-col gap-y-4 items-center ">
            <Skeleton variant="circular" width={500} height={500} />
            <Skeleton variant="rectangular" width={210} height={118} />
          </div>
        ) : sub ? (
          <SubscriptionDetailView subscription={sub} />
        ) : (
          <div>No data found</div>
        )}
      </div>
    </MainTemplate>
  );
}
