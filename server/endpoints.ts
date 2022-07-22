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
    const { data: videos } = await axios.get<LikeResult>(
      `${YOUTUBE_BASE_URL}/videos`,
      {
        params,
      }
    );

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

    const combined = videos.items.map((video) => {
      const [videoStat] = videoStatistics.items.filter(
        (stat) => stat.id === video.id
      );
      return { ...video, statistics: videoStat.statistics };
    });

    return [combined];
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
