import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Video } from "../model/Video";
import { useVideo_Read } from "../model/useVideo_Read";

export default function Likes() {
  const [videos, setVideos] = useState<Video[] | "loading">();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCount, setCurrentCount] = useState(0);
  const getLikes = async () => {
    const [transformData, totalResults] = await useVideo_Read({});
    setVideos(Array.isArray(transformData) ? transformData : undefined);
    setCurrentCount(totalResults);
  };
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <MainTemplate>
      <main className="flex m-6">
        <h1>Your Likes</h1>
        <div>
          {videos === "loading" ? (
            <div className="flex flex-col  items-center ">
              <Skeleton variant="rectangular" width={210} height={118} />
            </div>
          ) : videos ? (
            <div className="flex flex-wrap gap-4">
              {videos.map((video) => {
                const datePublished = dayjs(video.publishedAt).fromNow();
                return (
                  <section key={video.id} className="w-96 space-y-2">
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
                  </section>
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
