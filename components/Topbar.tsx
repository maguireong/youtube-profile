import { useState, useEffect } from "react";
import { User } from "../model";
import { getUser } from "../server";
import { SearchInput } from "./SearchInput";
import { ImYoutube2 } from "react-icons/im";
import { ClickArea } from "./ClickArea";

type TopBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export function TopBar({ searchTerm, setSearchTerm }: TopBarProps) {
  const [user, setUser] = useState<User>();
  const getUserData = async () => {
    const data = await getUser();
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
    <div className="flex items-center border-b-2 bg-youtubeBlack py-2 px-5 justify-between w-full">
      <ClickArea click="/">
        <ImYoutube2 className="text-white" size="72px" />
      </ClickArea>
      <SearchInput
        className="rounded w-96 h-8 px-2 bg-white "
        onChange={setSearchTerm}
        value={searchTerm}
      />
      <img
        alt="User dp"
        className="rounded-full w-12"
        src={user?.picture ?? ""}
      />
    </div>
  );
}
