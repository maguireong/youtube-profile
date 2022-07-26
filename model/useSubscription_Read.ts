import { getUserSubscriptions } from "../server/endpoints";
import { Subscription } from "./Subscription";

export async function useSubscription_Read({
  id,
}: {
  id?: string;
}): Promise<Subscription | Subscription[] | "loading"> {
  const data = await getUserSubscriptions();
  const transformData = data.items.map((data, i) => ({
    id: data.id,
    channelId: data.snippet.channelId,
    mostRecentIndex: i,
    description: data.snippet.description,
    title: data.snippet.title,
    thumbnail: {
      url: data.snippet.thumbnails.default.url,
      height: data.snippet.thumbnails.default.height,
      width: data.snippet.thumbnails.default.width,
    },
    subscriptAt: data.snippet.publishedAt,
  }));

  if (id) {
    const transformedDetailData =
      transformData.find((data) => data.id === id) ?? "loading";

    return transformedDetailData;
  }

  return transformData;
}
