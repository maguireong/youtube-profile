import { Playlist, Video } from "../../model";
import { fetchPlaylists } from "../../server";

export async function getPlaylistData(): Promise<Playlist[]> {
  const playlists = await fetchPlaylists();
  const transformData = playlists.map((playlist, i) => {
    const videos: Omit<Video, "statistics">[] = playlist.items.map((video) => ({
      id: video.snippet.resourceId.videoId,
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
      playlistId: playlist.playlistId ?? "",
    }));
    return videos;
  });

  return transformData;
}
