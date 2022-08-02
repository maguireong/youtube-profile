import classNames from "classnames";
import { useEffect, useState } from "react";
import { MainTemplate, TopBar, ClickArea } from "../components";
import { Playlist } from "../model";
import { useWindowWidth } from "../useWindowWidth";
import { EmptyVideoPage } from "../views";
import { getPlaylistData } from "../youtube";

export default function Playlists() {
  const isMobileView = useWindowWidth() < 1290;
  const [playlists, setPlaylists] = useState<Playlist[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const getPlaylists = async () => {
    const data = await getPlaylistData();
    setPlaylists(data);
  };
  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <MainTemplate>
      <main className={searchTerm && "h-screen"}>
        {!isMobileView && (
          <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}

        <section
          className={classNames(isMobileView ? "mx-8 pb-12" : "mx-32", "py-12")}
        >
          <h1
            className={classNames(
              isMobileView ? "flex justify-center" : "",
              "text-4xl my-12 text-white"
            )}
          >
            Your Playlists
          </h1>
          <div className="flex flex-col pb-12 gap-y-2">
            {!playlists ? (
              <EmptyVideoPage />
            ) : (
              playlists.map((videos) =>
                videos
                  .filter((video) =>
                    video.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((video) => {
                    return (
                      <ClickArea
                        key={video.id}
                        click={`https://www.youtube.com/watch?v=${encodeURIComponent(
                          video.id
                        )}&list=${encodeURIComponent(video.playlistId)}`}
                        className="flex flex-wrap-reverse space-y-8 justify-between items-center hover:opacity-50 text-white"
                      >
                        <div className="space-y-2 ">
                          <div className="text-2xl">{video.title}</div>
                          <div>{video.creatorName}</div>
                        </div>
                        <img
                          alt="Playlist thumbnail"
                          src={video.thumbnail.url}
                          height={video.thumbnail.height}
                          width={video.thumbnail.width}
                        />
                      </ClickArea>
                    );
                  })
              )
            )}
          </div>
        </section>
      </main>
    </MainTemplate>
  );
}
