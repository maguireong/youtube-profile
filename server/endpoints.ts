import axios from "axios";
import { getCookie } from "cookies-next";

const access_token = getCookie("accessToken");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

type SubscriptionResult = {
  items: {
    id: string;
    snippet: {
      channelId: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          height: string;
          width: string;
        };
        high: {
          url: string;
          height: string;
          width: string;
        };
      };
      title: string;
      publishedAt: string;
    };
  }[];
  pageInfo: {
    totalResults: number;
  };
};

export async function getUserSubscriptions() {
  const MAX_RESULTS = 50;
  try {
    const params = {
      part: "snippet",
      mine: true,
      access_token,
      maxResults: MAX_RESULTS,
    };
    const { data } = await axios.get<SubscriptionResult>(
      `${YOUTUBE_BASE_URL}/subscriptions`,
      { params }
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

type LikeResult = {
  items: {
    id: string;
    snippet: {
      channelId: string;
      channelTitle: string;
      description: string;
      title: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
          height: string;
          width: string;
        };
      };
    };
  }[];
  pageInfo: {
    totalResults: number;
  };
};

type StatisticResult = {
  items: {
    id: string;
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }[];
  pageInfo: {
    totalResults: number;
  };
};

export async function getVideoLikes() {
  const MAX_RESULTS = 50;
  try {
    const params = {
      part: "snippet",
      mine: true,
      access_token,
      myRating: "like",
      maxResults: MAX_RESULTS,
    };
    const { data: likes } = await axios.get<LikeResult>(
      `${YOUTUBE_BASE_URL}/videos`,
      {
        params,
      }
    );
    return likes;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getVideoStatistics() {
  const MAX_RESULTS = 50;
  try {
    const statsParams = {
      part: "statistics",
      mine: true,
      access_token,
      myRating: "like",
      maxResults: MAX_RESULTS,
    };
    const { data: videoStatistics } = await axios.get<StatisticResult>(
      `${YOUTUBE_BASE_URL}/videos`,
      {
        params: statsParams,
      }
    );

    return videoStatistics;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getVideos() {
  const MAX_RESULTS = 50;
  try {
    const [videoLikes, videoStatistics] = await Promise.all([
      getVideoLikes(),
      getVideoStatistics(),
    ]);

    const combined = videoLikes.items.map((video) => {
      const [videoStat] = videoStatistics.items.filter(
        (stat) => stat.id === video.id
      );
      return { ...video, statistics: videoStat.statistics };
    });

    return combined;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

type PlaylistIdResults = {
  items: {
    id: string;
  }[];
};

export async function getPlaylistIds() {
  const MAX_RESULTS = 50;
  try {
    const statsParams = {
      part: "snippet",
      mine: true,
      access_token,
      maxResults: MAX_RESULTS,
    };
    const { data } = await axios.get<PlaylistIdResults>(
      `${YOUTUBE_BASE_URL}/playlists`,
      {
        params: statsParams,
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

type PlaylistItemsResults = {
  items: {
    id: string;
    snippet: {
      channelId: string;
      channelTitle: string; // personal
      description: string;
      title: string;
      publishedAt: string;
      videoOwnerChannelTitle: string; // viewing user
      thumbnails: {
        high: {
          url: string;
          height: string;
          width: string;
        };
      };
      resourceId: {
        videoId: string;
      };
    };
  }[];
  pageInfo: {
    totalResults: number;
  };
};

export async function getPlaylistItems(playlistId: string) {
  const MAX_RESULTS = 50;
  try {
    const statsParams = {
      part: "snippet",
      mine: true,
      access_token,
      maxResults: MAX_RESULTS,
      playlistId,
    };
    // retrieve videoId for the search api
    const { data } = await axios.get<PlaylistItemsResults>(
      `${YOUTUBE_BASE_URL}/playlistItems`,
      {
        params: statsParams,
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getPlaylists() {
  try {
    const playlistIds = await getPlaylistIds();
    const playlists = await Promise.all(
      playlistIds.items.map(({ id }) => getPlaylistItems(id))
    );

    const playlistsWithIds = playlists.map((playlist, i) => {
      return { playlistId: playlistIds.items[i].id, ...playlist };
    });

    return playlistsWithIds;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
