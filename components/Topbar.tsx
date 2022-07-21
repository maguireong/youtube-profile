import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { FaYoutube } from "react-icons/fa";
import { User } from "../model/User";
import { getGoogleUser } from "../server/endpoints";
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
    <div className="flex items-center border-b-2 bg-gray-800 py-2 px-4 justify-between w-[93vw] ">
      <div className="flex items-center space-x-1 font-semibold text-white text-base ">
        <FaYoutube className="text-5xl text-red-600" /> Youtube
      </div>
      <SearchInput
        className="text-white rounded w-96 bg-gray-700"
        onChange={setSearchTerm}
        value={searchTerm}
      />
      <Avatar alt="Remy Sharp" src={user?.picture ?? ""} />
    </div>
  );
}
