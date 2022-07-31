import axios from "axios";
import { getCookie } from "cookies-next";

const access_token = getCookie("accessToken");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";
const MAX_RESULTS = 50;

type PlaylistIdResults = {
  items: {
    id: string;
  }[];
};

export async function getPlaylistIds() {
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
    const formattedData = data.items.map(({ id }) => id);
    return formattedData;
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
      playlistIds.map((id) => getPlaylistItems(id))
    );

    const playlistsWithIds = playlists.map((playlist, i) => ({
      playlistId: playlistIds[i],
      ...playlist,
    }));

    return playlistsWithIds;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
