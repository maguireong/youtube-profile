import { Subscription } from ".";
import { getUserSubscriptions } from "../../server";

export async function useSubscription_Read(prop: {
  id?: string;
}): Promise<Subscription | Subscription[] | "loading"> {
  const data = await getUserSubscriptions();
  const transformData = data.items.map(({ id, snippet }, i) => ({
    id,
    channelId: snippet.channelId,
    mostRecentIndex: i,
    description: snippet.description,
    title: snippet.title,
    thumbnail: {
      url: snippet.thumbnails.default.url,
      height: snippet.thumbnails.default.height,
      width: snippet.thumbnails.default.width,
    },
    subscriptAt: snippet.publishedAt,
  }));

  if (prop.id) {
    const transformedDetailData =
      transformData.find((data) => data.id === prop.id) ?? "loading";

    return transformedDetailData;
  }

  return transformData;
}
