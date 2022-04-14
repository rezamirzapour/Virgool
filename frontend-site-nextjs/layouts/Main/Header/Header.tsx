import type { FC } from "react";
import Link from "next/link";
import { BsSearch, BsBell } from "react-icons/bs";
import Profile from "./Profile";
import Categories from "./Categories";

const Header: FC = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img width="38px" height="50px" src="/images/logo.png" />
          <Link href={"/posts/create"}>
            <a>نوشتن پست جدید</a>
          </Link>
        </div>
        <div className="flex items-center">
          <button className="ml-3">
            <BsSearch />
          </button>
          <button className="ml-3">
            <BsBell />
          </button>
          <Profile />
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default Header;
