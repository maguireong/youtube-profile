import { Avatar } from "@mui/material";
import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Button } from "../components/Button";
import getGoogleOAuthURL from "../server/getGoogleUrl";
import { getGoogleUser } from "../server/endpoints";

type UserData = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

export default function Home() {
  const link = getGoogleOAuthURL();
  const access_token = Cookies.get("accessToken");
  const id_token = Cookies.get("idToken");

  const [user, setUser] = useState<UserData>();
  const getUserData = async () => {
    if (!id_token || !access_token) {
      return setUser(undefined);
    }
    const data = await getGoogleUser(id_token, access_token);
    setUser({
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    });
  };
  useEffect(() => {
    getUserData();
  }, [access_token]);

  return (
    <>
      <Head>
        <title>Youtube Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTemplate>
        <div className="w-full h-full flex items-center justify-center ">
          <Avatar alt="Avatar" src={user?.picture ?? ""} />
          <h1 className="text-4xl">{user?.name ?? "Maguire Ong"}</h1>
          <Button
            className="rounded-full bg-white flex items-center p-2"
            link={link}
          >
            Connect to google
          </Button>
        </div>
      </MainTemplate>
    </>
  );
}
