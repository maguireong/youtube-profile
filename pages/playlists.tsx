import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { TopBar } from "../components/Topbar";
import { Playlist } from "../model/Playlist";
import { usePlaylist_Read } from "../model/usePlaylist_Read";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[] | "loading">();
  const [searchTerm, setSearchTerm] = useState("");
  const getPlaylists = async () => {
    const data = await usePlaylist_Read();
    setPlaylists(data);
  };
  useEffect(() => {
    getPlaylists();
  }, []);
  console.log(playlists);

  return (
    <MainTemplate>
      <main className={classNames("ml-36 mr-8")}>
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className="text-4xl ml-12 mt-12 text-white">Your Playlists</h1>
        <div className="flex mt-8 flex-col space-y-2">
          {playlists === "loading" ? (
            <CircularProgress />
          ) : (
            playlists
              // ?.filter((playlist) =>
              //   playlist[0].toLowerCase().includes(searchTerm.toLowerCase())
              // )
              ?.map((videos) =>
                videos.map((video, i) => {
                  return (
                    <div
                      key={video.id}
                      className="flex justify-between text-white"
                    >
                      {
                        <>
                          <div className="space-y-2 ">
                            <div className="text-2xl">{video.title}</div>
                            <div className="">{video.creatorName}</div>
                          </div>
                          <img
                            src={video.thumbnail.url}
                            height={video.thumbnail.height}
                            width={video.thumbnail.width}
                          />
                        </>
                      }
                    </div>
                  );
                })
              )
          )}
        </div>
      </main>
    </MainTemplate>
  );
}
