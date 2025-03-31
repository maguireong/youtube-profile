import classNames from "classnames";
import dayjs from "dayjs";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { MainTemplate, Button, ClickArea } from "../components";
import { User, Video, Subscription } from "../model";
import { getUser, logout } from "../server";
import { useWindowWidth } from "../useWindowWidth";
import { getVideoData, getSubscriptionData } from "../youtube";
import { EmptyVideoPage } from "./EmptyVideoPage";

export function ProfileView() {
  const [user, setUser] = useState<User>();
  const [videos, setVideos] = useState<Video[]>();
  const [subs, setSubs] = useState<Subscription[]>();
  const isMobileView = useWindowWidth() < 1290;

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
      <section className={classNames(
        isMobileView ? "px-4 pb-8" : "pl-40 pr-16 pb-12",
        "flex flex-col w-full"
      )}>
        <UserProfile user={user} videos={videos} subs={subs} />
        {!videos || !subs || videos.length === 0 || subs.length === 0 ? (
          <EmptyVideoPage />
        ) : (
          <BasicInfo videos={videos} subs={subs} />
        )}
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
  const isMobileView = useWindowWidth() < 1290;
  
  return (
    <div className="flex flex-col items-center mt-12 mb-8 gap-6">
      <img
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border border-gray-600"
        src={user?.picture ?? ""}
      />
      
      <h1 className="text-3xl font-medium text-white">
        {user?.name ?? "Maguire Ong"}
      </h1>
      
      <section className={classNames(
        isMobileView ? "gap-6" : "gap-12",
        "flex justify-center"
      )}>
        <div className="flex flex-col items-center">
          <div className="text-youtubeRed text-xl font-bold">{videos?.length ?? 0}</div>
          <div className="text-gray-300 text-sm">Likes</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-youtubeRed text-xl font-bold">{subs?.length ?? 0}</div>
          <div className="text-gray-300 text-sm">Subscriptions</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-youtubeRed text-xl font-bold">
            {numeral(
              videos
                ?.flatMap((video) => Number(video.statistics.viewCount))
                .reduce((partialSum, a) => partialSum + a, 0)
            ).format("0a")}
          </div>
          <div className="text-gray-300 text-sm">Views</div>
        </div>
      </section>
      
      <Button
        className="rounded-full font-medium hover:bg-gray-200 mt-2 px-6 py-2 text-black bg-white"
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
  const isMobileView = useWindowWidth() < 1290;
  
  return (
    <main className={classNames(
      isMobileView ? "px-0" : "px-8",
      "mt-8 w-full"
    )}>
      <div className={classNames(
        isMobileView ? "flex-col gap-8" : "flex gap-12",
        "flex w-full"
      )}>
        {/* Liked Videos Section */}
        <div className={classNames(
          isMobileView ? "w-full" : "w-1/2",
          "flex flex-col gap-4"
        )}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Liked videos</h2>
            <Button 
              text="See all" 
              click="/likes" 
              className="text-sm text-blue-400 hover:text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {videos?.slice(0, 5).map((video) => (
              <ClickArea
                click={`https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`}
                key={video.id}
                className="flex gap-3 hover:bg-white/10 rounded-lg p-2 transition-colors"
              >
                <img
                  alt="Video thumbnail"
                  src={video.thumbnail.url}
                  className="w-40 h-24 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between py-1">
                  <h3 className="text-white font-medium line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="text-gray-400 text-sm">
                    <div>{video.creatorName}</div>
                    <div>
                      {numeral(video.statistics.likeCount).format("0a")} likes • 
                      {numeral(video.statistics.viewCount).format("0a")} views
                    </div>
                  </div>
                </div>
              </ClickArea>
            ))}
          </div>
        </div>
        
        {/* Subscriptions Section */}
        <div className={classNames(
          isMobileView ? "w-full" : "w-1/2",
          "flex flex-col gap-4"
        )}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Subscriptions</h2>
            <Button 
              text="See all" 
              click="/subscriptions" 
              className="text-sm text-blue-400 hover:text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {subs?.slice(0, 10).map(({ id, subscriptAt, title, thumbnail }) => (
              <ClickArea
                key={id}
                click={`/subscriptions/${encodeURIComponent(id)}`}
                className="flex items-center gap-3 hover:bg-white/10 rounded-full p-2 transition-colors"
              >
                <img
                  alt="Channel"
                  src={thumbnail.url}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{title}</div>
                  <div className="text-gray-400 text-xs">
                    Subscribed on {dayjs(subscriptAt).format("MMM D, YYYY")}
                  </div>
                </div>
              </ClickArea>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}