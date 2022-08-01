import { useState, useEffect } from "react";
import { FaYoutube } from "react-icons/fa";
import { User } from "../model";
import { getUser } from "../server";
import { SearchInput } from "./SearchInput";

type TopBarProps = {
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
};

export function TopBar({
  searchTerm = "",
  setSearchTerm = () => {},
}: TopBarProps) {
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
    <div className="flex items-center border-b-2 bg-youtubeBlack py-2 px-4 justify-between w-[93vw] ">
      <div className="flex items-center space-x-2 font-semibold text-white text-base ">
        <FaYoutube className="text-5xl text-youtubeRed" />
        <span>Youtube</span>
      </div>
      <SearchInput
        className="text-white rounded w-96 bg-gray-600"
        onChange={setSearchTerm}
        value={searchTerm}
      />
      <img alt="User picture" src={user?.picture ?? ""} />
    </div>
  );
}
