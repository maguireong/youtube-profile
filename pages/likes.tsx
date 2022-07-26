import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Video } from "../model/Video";
import { useVideo_Read } from "../model/useVideo_Read";
import { TopBar } from "../components/Topbar";
import classNames from "classnames";
import { Button } from "../components/Button";

export default function Likes() {
  const [videos, setVideos] = useState<Video[] | "loading">();
  const [searchTerm, setSearchTerm] = useState("");
  const getLikes = async () => {
    const transformData = await useVideo_Read({});
    setVideos(Array.isArray(transformData) ? transformData : undefined);
  };
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <MainTemplate>
      <main className={classNames("ml-28", searchTerm && "h-screen")}>
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className="text-4xl ml-12 mt-12 text-white">Your Likes</h1>

        <div className="m-8">
          {videos === "loading" ? (
            <div className="flex flex-col items-center ">
              <Skeleton variant="rectangular" width={210} height={118} />
            </div>
          ) : videos ? (
            <div className="flex flex-wrap gap-4">
              {videos
                .filter((video) =>
                  video.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((video) => {
                  const datePublished = dayjs(video.publishedAt).fromNow();
                  return (
                    <Button
                      link={`https://www.youtube.com/watch?v=${encodeURIComponent(
                        video.id
                      )}`}
                      key={video.id}
                      className="hover:opacity-50 w-96 space-y-2"
                    >
                      <img
                        src={video.thumbnail.url}
                        height={video.thumbnail.height}
                        width={video.thumbnail.width}
                      />
                      <div className="font-semibold text-white">
                        {video.title}
                      </div>
                      <div className=" text-white">
                        <h1 className="font-semibold">{video.creatorName}</h1>
                        <div className="space-x-2  flex items-center">
                          <div>{video.statistics.likeCount} likes</div>
                          <div>{video.statistics.commentCount} comments</div>
                          <div>{video.statistics.favoriteCount} comments</div>
                          <div>{video.statistics.viewCount} views</div>
                        </div>

                        <div>{datePublished}</div>
                      </div>
                    </Button>
                  );
                })}
            </div>
          ) : (
            <div>No data found</div>
          )}
        </div>
      </main>
    </MainTemplate>
  );
}
