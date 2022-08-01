import dayjs from "dayjs";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { MainTemplate, Button, ClickArea } from "../components";
import { User, Video, Subscription } from "../model";
import { getUser, logout } from "../server";
import { getVideoData, getSubscriptionData } from "../youtube";

export function ProfileView() {
  const [user, setUser] = useState<User>();
  const [videos, setVideos] = useState<Video[]>();
  const [subs, setSubs] = useState<Subscription[]>();

  const getUserData = async () => {
    const data = await getUser();
    setUser({
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    });
  };
  const getLikes = async () => {
    const transformData = await getVideoData({});
    setVideos(Array.isArray(transformData) ? transformData : undefined);
  };
  const getSubscriptions = async () => {
    const transformData = await getSubscriptionData({});
    setSubs(Array.isArray(transformData) ? transformData : undefined);
  };

  useEffect(() => {
    getUserData();
    getLikes();
    getSubscriptions();
  }, []);

  return (
    <MainTemplate>
      <section className="flex ml-32 flex-col">
        <UserProfile user={user} videos={videos} subs={subs} />
        <BasicInfo videos={videos} subs={subs} />
      </section>
    </MainTemplate>
  );
}

function UserProfile({
  user,
  videos,
  subs,
}: {
  user?: User;
  videos?: Video[];
  subs?: Subscription[];
}) {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center mt-20">
      <img
        alt="Profile picture"
        className="w-40 rounded-full"
        src={user?.picture ?? ""}
      />
      <h1 className="text-4xl font-medium text-white">
        {user?.name ?? "Maguire Ong"}
      </h1>
      <section className="flex space-x-8 justify-center">
        <div className="flex font-semibold flex-col justify-center items-center gap-1">
          <div className="text-youtubeRed text-2xl">{videos?.length}</div>
          <div className="text-white text-2xl">Likes</div>
        </div>
        <div className="flex font-semibold flex-col justify-center items-center gap-1">
          <div className="text-youtubeRed text-2xl">{subs?.length}</div>
          <div className="text-white text-2xl">Subscriptions</div>
        </div>
        <div className="flex font-semibold flex-col justify-center items-center gap-1">
          <div className="text-youtubeRed text-2xl">
            {numeral(
              videos
                ?.flatMap((video) => Number(video.statistics.viewCount))
                .reduce((partialSum, a) => partialSum + a, 0)
            ).format("0 a")}
          </div>
          <div className="text-white text-2xl">Views</div>
        </div>
      </section>
      <Button
        className="rounded-full font-semibold hover:text-youtubeRed my-4 hover:bg-white px-6 py-3 text-white bg-youtubeRed"
        click={() => logout()}
        text="Logout"
      />
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
  const seeMoreCss =
    "border-2 hover:bg-white hover:text-black border-white rounded-full py-1.5 px-5 font-medium text-base";

  return (
    <main className="my-12 mx-24">
      <div className="flex space-x-24 justify-between">
        <div className="text-white w-1/2 flex flex-col space-y-4">
          <h1 className="flex justify-between items-center">
            <div className="text-2xl font-semibold">Top Likes</div>
            <Button text="SEE MORE" click="/likes" className={seeMoreCss} />
          </h1>

          <div className="flex flex-col space-y-8">
            {videos?.slice(0, 5).map((video) => (
              <ClickArea
                click={`https://www.youtube.com/watch?v=${encodeURIComponent(
                  video.id
                )}`}
                key={video.id}
                className="text-wrap space-y-2 hover:opacity-50"
              >
                <img
                  alt="Video thumbnail"
                  src={video.thumbnail.url}
                  height={video.thumbnail.height}
                  width={video.thumbnail.width}
                />
                <div className="flex flex-col justify-start text-left">
                  <div className="font-semibold text-left text-white">
                    {video.title}
                  </div>
                  <div className="text-white">
                    <h1 className="font-semibold">{video.creatorName}</h1>
                    <div>
                      {numeral(video.statistics.likeCount).format("0 a")} likes
                    </div>
                  </div>
                </div>
              </ClickArea>
            ))}
          </div>
        </div>
        <div className="text-white w-1/2 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Top Subscriptions</h1>
            <Button
              text="SEE MORE"
              click="/subscriptions"
              className={seeMoreCss}
            />
          </div>

          <div className="flex flex-col gap-6">
            {subs?.slice(0, 20).map(({ id, subscriptAt, title, thumbnail }) => {
              const dateSubscript = dayjs(subscriptAt).format("DD/MM/YYYY");
              return (
                <ClickArea
                  key={id}
                  click={`/subscriptions/${encodeURIComponent(id)}`}
                  className="flex justify-between items-center hover:opacity-50"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      alt="Subscription thumbnail"
                      className="rounded-full"
                      src={thumbnail.url}
                      height={thumbnail.height}
                      width={thumbnail.width}
                    />
                    <div className="font-semibold text-lg">{title}</div>
                  </div>
                  <div>Subscribed at: {dateSubscript}</div>
                </ClickArea>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
