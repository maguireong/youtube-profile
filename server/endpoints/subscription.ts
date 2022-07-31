import axios from "axios";
import { getCookie } from "cookies-next";

const access_token = getCookie("accessToken");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";
const MAX_RESULTS = 50;

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

export async function fetchUserSubscriptions() {
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
