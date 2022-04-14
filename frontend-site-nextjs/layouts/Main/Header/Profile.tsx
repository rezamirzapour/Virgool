import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { MeServices } from "services";
import Link from "next/link";
import { useOnClickOutside } from "usehooks-ts";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: profile,
    isError,
    isLoading: isLoadingProfile,
  } = useQuery("profile", () =>
    MeServices.getProfile().then(({ data }) => data)
  );
  const ref = useRef(null);

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  const handleClickInside = () => {
    setIsOpen(true);
  };
  useOnClickOutside(ref, handleClickOutside);

  if (isError)
    return (
      <Link href={"/login"}>
        <a>ورود</a>
      </Link>
    );
  else if (!isLoadingProfile)
    return (
      <button ref={ref} onClick={handleClickInside} className="relative">
        <img
          src={profile?.avatar?.fullPath}
          alt={profile?.email}
          className="rounded-full h-[50px] w-[50px]"
        />
        {isOpen && (
          <div className="bg-white shadow border rounded w-[250px] p-4 absolute top-14 left-0 text-right">
            <div className="border-b border-gray-200 pb-2">
              <h6>
                {profile?.firstName} {profile?.lastName}
              </h6>
              <Link href={"/profile"}>
                <a className="text-sm">مشاهده پروفایل</a>
              </Link>
            </div>
            <ul className="text-sm">
              <li className="my-4">
                <Link href="articles/create">
                  <a className="text-blue-400">نوشتن پست جدید</a>
                </Link>
              </li>
              <li className="my-4">
                <Link href="settings">
                  <a className="text-gray-500">تنظیمات حساب کاربری</a>
                </Link>
              </li>
              <li className="my-4">
                <Link href="me/articles">
                  <a className="text-gray-500">پست ها و پیش نویس ها</a>
                </Link>
              </li>
              <li className="my-4">
                <Link href="me/articles">
                  <a className="text-gray-500">مشاهده آمار‍</a>
                </Link>
              </li>
              <li className="my-4">
                <Link href="me/articles">
                  <a className="text-gray-500">علاقه مندی ها من</a>
                </Link>
              </li>
              <li className="my-4">
                <Link href="me/articles">
                  <a className="text-gray-500">پست های مورد علاقه</a>
                </Link>
              </li>
              <li className="my-4">
                <Link href="me/articles">
                  <a className="text-gray-500">لیست ها</a>
                </Link>
              </li>
              <li className="my-4">
                <Link href="me/articles">
                  <a className="text-gray-500">انتشارات</a>
                </Link>
              </li>
              <li className="my-4">
                <Link href="me/articles">
                  <a className="text-gray-500">خروج</a>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </button>
    );
  return null;
}
