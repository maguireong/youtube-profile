import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Button } from "../components/Button";
import { TopBar } from "../components/Topbar";
import { Playlist } from "../model/Playlist";
import { usePlaylist_Read } from "../model/usePlaylist_Read";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const getPlaylists = async () => {
    const data = await usePlaylist_Read();
    setPlaylists(data);
  };
  useEffect(() => {
    getPlaylists();
  }, []);

  const router = useRouter();

  return (
    <MainTemplate>
      <main className={classNames("ml-28 mr-8", searchTerm && "h-screen")}>
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className="text-4xl ml-12 mt-12 text-white">Your Playlists</h1>
        <div className="flex m-8 flex-col space-y-2">
          {playlists?.map((videos) =>
            videos
              .filter((video) =>
                video.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((video) => {
                return (
                  <Button
                    key={video.id}
                    link={`https://www.youtube.com/watch?v=${encodeURIComponent(
                      video.id
                    )}&list=${encodeURIComponent(video.playlistId)}`}
                    className="flex justify-between items-center hover:opacity-50 text-white"
                  >
                    <div className="space-y-2 ">
                      <div className="text-2xl">{video.title}</div>
                      <div>{video.creatorName}</div>
                    </div>
                    <img
                      src={video.thumbnail.url}
                      height={video.thumbnail.height}
                      width={video.thumbnail.width}
                    />
                  </Button>
                );
              })
          )}
        </div>
      </main>
    </MainTemplate>
  );
}
