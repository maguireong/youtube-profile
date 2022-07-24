import { getPlaylists } from "../server/endpoints";
import { Playlist } from "./Playlist";
import { Video } from "./Video";

export async function usePlaylist_Read(): Promise<Playlist[] | "loading"> {
  const playlists = await getPlaylists();
  const transformData = playlists.map((playlist, i) => {
    const videos: Omit<Video, "statistics">[] = playlist.items.map((video) => ({
      id: video.id,
      channelId: video.snippet.channelId,
      mostRecentIndex: i,
      creatorName: video.snippet.videoOwnerChannelTitle,
      description: video.snippet.description,
      title: video.snippet.title,
      thumbnail: {
        url: video.snippet.thumbnails.high?.url,
        height: video.snippet.thumbnails.high?.height,
        width: video.snippet.thumbnails.high?.width,
      },
      publishedAt: video.snippet.publishedAt,
    }));
    return videos;
  });

  return transformData;
}
