import { Video } from "./video";

export type Playlist = Omit<Video, "statistics">[];
