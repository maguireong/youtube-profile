import { Avatar } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Button } from "../components/Button";
import { TopBar } from "../components/Topbar";
import { User } from "../model/User";
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
  const getUserData = async () => {
    const data = await getGoogleUser();
    setUser({
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    });
  };
  useEffect(() => {
    if (accessToken) getUserData();
    else if (refreshToken) refreshAccessToken();
  }, []);

  return accessToken ? (
    <MainTemplate>
      <section className="flex  ml-28 flex-col">
        <TopBar />
        <div className="h-screen flex items-center justify-center ">
          <Avatar alt="A" src={user?.picture ?? ""} />
          <h1 className="text-4xl">{user?.name ?? "Maguire Ong"}</h1>
          <Button click={() => logout()}></Button>
        </div>
      </section>
    </MainTemplate>
  ) : (
    <LandingPage />
  );
}
