import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ClickArea, MainTemplate, TopBar } from "../components";
import numeral from "numeral";
import { Video } from "../model";
import { getVideoData } from "../youtube";
import { windowWidth } from "../configs";
import classNames from "classnames";

export default function Likes() {
  const [videos, setVideos] = useState<Video[] | "loading">();
  const [searchTerm, setSearchTerm] = useState("");
  const getLikes = async () => {
    const transformData = await getVideoData({});
    setVideos(Array.isArray(transformData) ? transformData : undefined);
  };
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <MainTemplate>
      <main className={searchTerm && "h-screen"}>
        {!windowWidth && (
          <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        <section
          className={classNames(windowWidth ? "py-6" : "mx-32 py-12", "")}
        >
          <h1
            className={classNames(
              windowWidth ? "flex justify-center" : "ml-24",
              "text-4xl my-12 text-white"
            )}
          >
            Your Likes
          </h1>

          <div
            className={classNames(
              windowWidth ? "ml-2" : "ml-24",
              "flex flex-wrap gap-4 items-start"
            )}
          >
            {videos === "loading" ? (
              <div className="flex flex-col items-center br4-skeleton"></div>
            ) : videos ? (
              videos
                .filter((video) =>
                  video.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((video) => {
                  const datePublished = dayjs(video.publishedAt).fromNow();
                  return (
                    <ClickArea
                      click={`https://www.youtube.com/watch?v=${encodeURIComponent(
                        video.id
                      )}`}
                      key={video.id}
                      className="hover:opacity-50 w-96 space-y-2"
                    >
                      <img
                        alt="Video thumbnail"
                        src={video.thumbnail.url}
                        height={video.thumbnail.height}
                        width={video.thumbnail.width}
                      />
                      <div className="flex text-white flex-col text-left">
                        <div className="font-semibold">{video.title}</div>
                        <div className="flex flex-col text-left">
                          <h1 className="font-semibold">{video.creatorName}</h1>
                          <div className="space-x-2 flex text-start">
                            <div>
                              {numeral(video.statistics.likeCount).format(
                                "0 a"
                              )}{" "}
                              likes
                            </div>
                            <div>{video.statistics.commentCount} comments</div>
                            <div>{video.statistics.favoriteCount} comments</div>
                            <div>
                              {numeral(video.statistics.viewCount).format(
                                "0 a"
                              )}{" "}
                              views
                            </div>
                          </div>
                          <div className="font-light text-sm">
                            {datePublished}
                          </div>
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
