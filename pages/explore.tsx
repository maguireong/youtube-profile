import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { usePopularVideo_Read } from "../model/usePopularVideo_Read";
import { PopularVideo } from "../model/Video";

export default function Explore() {
  const [videos, setVideos] = useState<PopularVideo[] | "loading">();
  const [searchTerm, setSearchTerm] = useState("");
  const getPopularVideos = async () => {
    const transformData = await usePopularVideo_Read({});
    setVideos(Array.isArray(transformData) ? transformData : undefined);
  };
  useEffect(() => {
    getPopularVideos();
  }, []);
  return (
    <MainTemplate>
      <main className="flex ml-28 flex-col h-screen">
        <h1 className="text-4xl ml-12 mt-12 text-white">Your Activities</h1>
      </main>
    </MainTemplate>
  );
}
