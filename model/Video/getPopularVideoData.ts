import { fetchPopularVideos } from "../../server";
import { PopularVideo } from ".";

export async function getPopularVideoData({
  id,
}: {
  id?: string;
}): Promise<PopularVideo | PopularVideo[] | "loading"> {
  const videos = await fetchPopularVideos();
  const transformData = videos.items.map((data, i) => ({
    id: data.id,
    channelId: data.snippet.channelId,
    mostRecentIndex: i,
    creatorName: data.snippet.channelTitle,
    description: data.snippet.description,
    title: data.snippet.title,
    thumbnail: {
      url: data.snippet.thumbnails.high.url,
      height: data.snippet.thumbnails.high.height,
      width: data.snippet.thumbnails.high.width,
    },
    publishedAt: data.snippet.publishedAt,
    playlistId: "",
  }));

  if (id) {
    const transformedDetaildata =
      transformData.find((data) => data.id === id) ?? "loading";

    return transformedDetaildata;
  }

  return transformData;
}
