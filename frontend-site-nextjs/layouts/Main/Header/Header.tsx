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
          {isError ? (
            <Link href={"/login"}>
              <a>ورود</a>
            </Link>
          ) : (
            !isLoadingProfile && (
              <button>
                <img
                  src={profile?.avatar?.fullPath}
                  alt={profile?.email}
                  className="rounded-full h-[50px] w-[50px]"
                />
              </button>
            )
          )}
        </div>
      </div>
      <div>
        {!isLoading &&
          categories.result?.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <a className="text-gray-80 hover:text-gray-60 ml-3 last:ml-0">
                {category.title}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Header;
