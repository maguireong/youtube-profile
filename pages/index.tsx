import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Button } from "../components/Button";
import { TopBar } from "../components/Topbar";
import { Subscription } from "../model/Subscription";
import { User } from "../model/User";
import { useSubscription_Read } from "../model/useSubscription_Read";
import { useVideo_Read } from "../model/useVideo_Read";
import { Video } from "../model/Video";
import {
  getGoogleUser,
  logout,
  refreshAccessToken,
} from "../server/getGoogleUrl";
import { LandingPage } from "../views/LandingPage";

export default function Home() {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  const [user, setUser] = useState<User>();
  const [videos, setVideos] = useState<Video[]>();
  const [subs, setSubs] = useState<Subscription[]>();

  const getUserData = async () => {
    const data = await getGoogleUser();
    setUser({
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    });
  };
  const getLikes = async () => {
    const transformData = await useVideo_Read({});
    setVideos(Array.isArray(transformData) ? transformData : undefined);
  };
  const getSubscriptions = async () => {
    const transformData = await useSubscription_Read({});
    setSubs(Array.isArray(transformData) ? transformData : undefined);
  };
  useEffect(() => {
    if (accessToken) {
      getUserData();
      getLikes();
      getSubscriptions();
    } else if (refreshToken) refreshAccessToken();
  }, []);

  return accessToken ? (
    <MainTemplate>
      <section className="flex ml-28 flex-col">
        <TopBar />
        <UserProfile user={user} videos={videos} />
        <BasicInfo videos={videos} subs={subs} />
      </section>
    </MainTemplate>
  ) : (
    <LandingPage />
  );
}

function UserProfile({ user, videos }: { user?: User; videos?: Video[] }) {
  return (
    <div className="flex flex-col gap-y-4 items-center mt-20">
      <Avatar
        alt="A"
        sx={{ width: 220, height: 220 }}
        src={user?.picture ?? ""}
      />
      <h1 className="text-4xl font-medium text-white">
        {user?.name ?? "Maguire Ong"}
      </h1>
      <section className="flex space-x-8">
        <div className="flex font-semibold flex-col justify-center items-center gap-1">
          <div className="text-youtubeRed text-2xl">{videos?.length}</div>
          <div className="text-white">Likes</div>
        </div>
        <div className="flex font-semibold flex-col justify-center items-center gap-1">
          <div className="text-youtubeRed text-2xl">{videos?.length}</div>
          <div className="text-white">Likes</div>
        </div>
        <div className="flex font-semibold flex-col justify-center items-center gap-1">
          <div className="text-youtubeRed text-2xl">{videos?.length}</div>
          <div className="text-white">Likes</div>
        </div>
      </section>
      <Button
        className="rounded-full font-semibold  px-6 py-3 text-white bg-youtubeRed"
        click={() => logout()}
      >
        Logout
      </Button>
    </div>
  );
}

function BasicInfo({
  videos,
  subs,
}: {
  videos?: Video[];
  subs?: Subscription[];
}) {
  return (
    <main className="ml-52 mr-24 mt-12">
      <div className="flex space-x-24 justify-between">
        <div className="text-white w-1/2 flex flex-col space-y-4">
          <h1 className="flex justify-between items-center">
            <div className="text-2xl font-semibold">Top Likes</div>
            <Button
              text="SEE MORE"
              link="/likes"
              className="border-2 hover:bg-white hover:text-black border-white rounded-full py-3 px-5 font-medium text-xl "
            />
          </h1>

          <div className="flex flex-col space-y-4">
            {videos?.slice(0, 5).map((video) => (
              <Button
                link={`https://www.youtube.com/watch?v=${encodeURIComponent(
                  video.id
                )}`}
                key={video.id}
                className="text-wrap space-y-2 hover:opacity-50"
              >
                <img
                  src={video.thumbnail.url}
                  height={video.thumbnail.height}
                  width={video.thumbnail.width}
                />
                <div className="font-semibold text-white">{video.title}</div>
                <div className=" text-white flex space-x-2">
                  <h1 className="font-semibold">{video.creatorName}</h1>
                  <div>{video.statistics.likeCount} likes</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
        <div className="text-white w-1/2 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Top Subscriptions</h1>
            <Button
              text="SEE MORE"
              link="/subscriptions"
              className="border-2 hover:bg-white hover:text-black border-white rounded-full py-3 px-5 font-medium text-xl "
            />
          </div>

          <div className="flex flex-col gap-6">
            {subs?.slice(0, 20).map(({ id, subscriptAt, title, thumbnail }) => {
              const dateSubscript = dayjs(subscriptAt).format("DD/MM/YYYY");
              return (
                <Button
                  key={id}
                  link={`/subscriptions/${encodeURIComponent(id)}`}
                  className="flex justify-between items-center hover:opacity-50"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={thumbnail.url}
                      height={thumbnail.height}
                      width={thumbnail.width}
                    />
                    <div className="font-semibold text-lg">{title}</div>
                  </div>
                  <div>Subscribed at: {dateSubscript}</div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
