import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ClickArea, MainTemplate, Shimmer, TopBar } from "../components";
import { PopularVideo } from "../model";
import { useWindowWidth } from "../useWindowWidth";
import { EmptyVideoPage } from "../views";
import { getPopularVideoData } from "../youtube";

export default function Explore() {
  const isMobileView = useWindowWidth() < 1290;
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
        {!isMobileView && (
          <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        <section
          className={classNames(isMobileView ? "mx-8 pb-24" : "mx-32", "py-12")}
        >
          <h1
            className={classNames(
              isMobileView ? "flex text-center" : "ml-24",
              "text-4xl my-12 text-white"
            )}
          >
            Your Top Suggested Videos
          </h1>

          {videos === "loading" ? (
            <ExploreShimmer />
          ) : videos ? (
            <div className="flex flex-wrap gap-4 justify-center items-start">
              {videos
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
                })}
            </div>
          ) : (
            <EmptyVideoPage />
          )}
        </section>
      </main>
    </MainTemplate>
  );
}

function ExploreShimmer() {
  return (
    <div className="h-screen flex gap-4 justify-center items-start">
      <div className="animate-pulse flex flex-col space-y-4">
        <Shimmer className="w-96 rounded-md h-64" />
        <Shimmer className="h-6 rounded-md" />
        <Shimmer className="h-4 w-20 rounded-md" />
      </div>
      <div className="animate-pulse flex flex-col space-y-4">
        <Shimmer className="w-96 rounded-md h-64" />
        <Shimmer className="h-6 rounded-md" />
        <Shimmer className="h-4 w-20 rounded-md" />
      </div>
    </div>
  );
}
