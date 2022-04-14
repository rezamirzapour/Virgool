import type { FC } from "react";
import { useQuery } from "react-query";
import { CategoriesServices, MeServices } from "services";
import Link from "next/link";
import { BsSearch, BsBell } from "react-icons/bs";

const Header: FC = () => {
  const { data: categories, isLoading } = useQuery("categories", () =>
    CategoriesServices.findAll({ paginate: false }).then(({ data }) => data)
  );
  const {
    data: profile,
    isError,
    isLoading: isLoadingProfile,
  } = useQuery("profile", () =>
    MeServices.getProfile().then(({ data }) => data)
  );

  const renderProfile = () => {
    if (isError)
      return (
        <Link href={"/login"}>
          <a>ورود</a>
        </Link>
      );
    else if (!isLoadingProfile)
      return (
        <button>
          <img
            src={profile?.avatar?.fullPath}
            alt={profile?.email}
            className="rounded-full h-[50px] w-[50px]"
          />
        </button>
      );
    return null;
  };

  const renderCategories = () => {
    if (!isLoading)
      return categories.result?.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <a className="text-gray-80 hover:text-gray-60 ml-3 last:ml-0">
            {category.title}
          </a>
        </Link>
      ));
    return null;
  };

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
          {renderProfile()}
        </div>
      </div>
      <nav className="mt-8">{renderCategories()}</nav>
    </div>
  );
};

export default Header;
