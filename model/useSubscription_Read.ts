import { getUserSubscriptions } from "../server/endpoints";
import { initialData, Subscription } from "./Subscription";

export async function useSubscription_Read({
  id,
}: {
  id?: string;
}): Promise<
  [
    transformData: Subscription | Subscription[] | "loading",
    totalResults: number
  ]
> {
  const data = await getUserSubscriptions();
  const transformData = data.items.map((data, i) => ({
    id: data.id,
    channelId: data.snippet.channelId,
    mostRecentIndex: i,
    description: data.snippet.description,
    title: data.snippet.title,
    thumbnail: data.snippet.thumbnails.default.url,
    subscriptAt: data.snippet.publishedAt,
  }));

  const totalResults = data.pageInfo.totalResults;

  if (id) {
    const transformedDetailData =
      transformData.find((data) => data.id === id) ?? "loading";

    return [transformedDetailData, totalResults];
  }
  const subscriptionData = transformData;

  return [subscriptionData, totalResults];
}
