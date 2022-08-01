import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ClickArea, MainTemplate, TopBar } from "../components";
import { windowWidth } from "../configs";
import { PopularVideo } from "../model";
import { getPopularVideoData } from "../youtube";

export default function Explore() {
  const [videos, setVideos] = useState<PopularVideo[] | "loading">();
  const [searchTerm, setSearchTerm] = useState("");
  const getPopularVideos = async () => {
    const transformData = await getPopularVideoData({});
    setVideos(Array.isArray(transformData) ? transformData : undefined);
  };
  useEffect(() => {
    getPopularVideos();
  }, []);
  return (
    <MainTemplate>
      <main className={classNames(searchTerm && "h-screen")}>
        {!windowWidth && (
          <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        <section
          className={classNames(windowWidth ? "mx-8" : "mx-32", "py-12")}
        >
          <h1
            className={classNames(
              windowWidth ? "flex text-center" : "ml-24",
              "text-4xl my-12 text-white"
            )}
          >
            Your Top Suggested Videos
          </h1>
          <div className="flex flex-wrap gap-4 justify-center items-start">
            {videos === "loading" ? (
              <div className="flex flex-col br4-skeleton"></div>
            ) : videos ? (
              videos
                .filter((video) =>
                  video.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((video) => {
                  const datePublished = dayjs(video.publishedAt).fromNow();
                  return (
                    <ClickArea
                      key={video.id}
                      click={`https://www.youtube.com/watch?v=${encodeURIComponent(
                        video.id
                      )}`}
                      className="w-96 space-y-2 hover:opacity-50"
                    >
                      <img
                        alt="Video thumbnail"
                        src={video.thumbnail.url}
                        height={video.thumbnail.height}
                        width={video.thumbnail.width}
                      />
                      <div className="flex flex-col text-left font-semibold text-white items-start">
                        <div>{video.title}</div>
                        <h1>{video.creatorName}</h1>
                        <div className="font-light text-sm">
                          {datePublished}
                        </div>
                      </div>
                    </ClickArea>
                  );
                })
            ) : (
              <div>No data found</div>
            )}
          </div>
        </section>
      </main>
    </MainTemplate>
  );
}
