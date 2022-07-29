import { Video } from ".";
import { getVideos } from "../../server";

export async function useVideo_Read({
  id,
}: {
  id?: string;
}): Promise<Video | Video[] | "loading"> {
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
    playlistId: "",
  }));

  if (id) {
    const transformedDetaildata =
      transformData.find((data) => data.id === id) ?? "loading";

    return transformedDetaildata;
  }

  return transformData;
}
