import type { FC } from "react";
import Link from "next/link";
import { MdOutlineSearch, MdOutlineNotifications } from "react-icons/md";
import Profile from "./Profile";
import Categories from "./Categories";

const Header: FC = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Link href={"/"}>
            <a>
              <img width="38px" height="50px" src="/images/logo.png" />
            </a>
          </Link>
          <Link href={"/articles/create"}>
            <a>نوشتن پست جدید</a>
          </Link>
        </div>
        <div className="flex items-center">
          <button className="ml-3">
            <MdOutlineSearch className="text-3xl" />
          </button>
          <button className="ml-3">
            <MdOutlineNotifications className="text-3xl" />
          </button>
          <Profile />
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default Header;
