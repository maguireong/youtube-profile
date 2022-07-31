import axios from "axios";
import { getCookie } from "cookies-next";

const access_token = getCookie("accessToken");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";
const MAX_RESULTS = 50;

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

export async function fetchVideoLikes() {
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

export async function fetchVideoStatistics() {
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

export async function fetchVideos() {
  try {
    const [videoLikes, videoStatistics] = await Promise.all([
      fetchVideoLikes(),
      fetchVideoStatistics(),
    ]);

    const combined = videoLikes.items.map((video) => {
      const [videoStat] = videoStatistics.items.filter(
        (stat) => stat.id === video.id
      );
      if (!videoStat)
        throw new Error(`Video statistic for ${video.id} is undefined`);
      return { ...video, statistics: videoStat.statistics };
    });

    return combined;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

type PopularVideoResults = {
  items: {
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      channelTitle: string;
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

export async function fetchPopularVideos() {
  const params = {
    part: "snippet",
    mine: true,
    access_token,
    chart: "mostPopular",
    maxResults: MAX_RESULTS,
  };
  const { data } = await axios.get<PopularVideoResults>(
    `${YOUTUBE_BASE_URL}/videos`,
    {
      params,
    }
  );

  return data;
}
