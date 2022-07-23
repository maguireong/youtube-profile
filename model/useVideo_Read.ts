import { getVideoLikes, getVideos } from "../server/endpoints";
import { Video } from "./Video";

export async function useVideo_Read({
  id,
}: {
  id?: string;
}): Promise<
  [transformData: Video | Video[] | "loading", totalResults: number]
> {
  const videos = await getVideos();
  const transformData = videos.map((data, i) => ({
    id: data?.id,
    channelId: data?.snippet.channelId,
    mostRecentIndex: i,
    creatorName: data?.snippet.channelTitle,
    description: data?.snippet.description,
    title: data?.snippet.title,
    thumbnail: {
      url: data?.snippet.thumbnails.high?.url,
      height: data?.snippet.thumbnails.high?.height,
      width: data?.snippet.thumbnails.high?.width,
    },
    statistics: {
      viewCount: data?.statistics.viewCount,
      likeCount: data?.statistics.likeCount,
      favoriteCount: data?.statistics.favoriteCount,
      commentCount: data?.statistics.commentCount,
    },
    publishedAt: data?.snippet.publishedAt,
  }));

  // const totalResults = data.pageInfo.totalResults;
  const totalResults = 47;

  if (id) {
    const transformedDetaildata =
      transformData.find((data) => data.id === id) ?? "loading";

    return [transformedDetaildata, totalResults];
  }
  const likedata = transformData;

  return [likedata, totalResults];
}
