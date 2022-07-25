export type Video = {
  id: string;
  channelId: string;
  mostRecentIndex: number;
  creatorName: string;
  description: string;
  title: string;
  publishedAt: string;
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  thumbnail: {
    url: string;
    height: string;
    width: string;
  };
  playlistId: string;
};
