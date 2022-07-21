import axios from "axios";
import { getCookie } from "cookies-next";

type GoogleUserResult = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

const access_token = getCookie("accessToken");
const id_token = getCookie("idToken");

export async function getGoogleUser(): Promise<GoogleUserResult> {
  try {
    const { data } = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

type GoogleSubscriptionResult = {
  items: {
    id: string;
    snippet: {
      channelId: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
        };
      };
      title: string;
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
    const { data } = await axios.get<GoogleSubscriptionResult>(
      "https://www.googleapis.com/youtube/v3/subscriptions",
      { params }
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
