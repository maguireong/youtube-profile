import { Video } from "../Video";

export type Playlist = Omit<Video, "statistics">[];
export * from "./getPlaylistData";
