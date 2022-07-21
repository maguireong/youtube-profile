import { Avatar } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Button } from "../components/Button";
import { TopBar } from "../components/Topbar";
import { User } from "../model/User";
import { getGoogleUser } from "../server/endpoints";
import getGoogleOAuthURL from "../server/getGoogleUrl";

export default function Home() {
  const link = getGoogleOAuthURL();

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
    getUserData();
  }, []);

  return (
    <>
      <Head>
        <title>Youtube Profile</title>
        <link rel="icon" href="/youtube.ico" />
      </Head>

      <MainTemplate>
        <section className="flex  ml-28 flex-col">
          <TopBar />
          <div className="h-screen flex items-center justify-center ">
            <Avatar alt="A" src={user?.picture ?? ""} />
            <h1 className="text-4xl">{user?.name ?? "Maguire Ong"}</h1>
            <Button
              className="rounded-full bg-white flex items-center p-2"
              link={link}
            >
              Connect to google
            </Button>
          </div>
        </section>
      </MainTemplate>
    </>
  );
}
