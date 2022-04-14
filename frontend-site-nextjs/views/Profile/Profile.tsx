import type { FC } from "react";
import { useQuery } from "react-query";
import { MeServices } from "services";

const Profile: FC = () => {
  const { data } = useQuery("profile", () =>
    MeServices.getProfile().then(({ data }) => data)
  );
  return (
    <div className="pt-8">
      <div className="flex flex-col items-center">
        <img
          src={data?.avatar?.fullPath}
          alt={data?.firstName}
          className="rounded-full w-[100px] h-[100px]"
        />
        <h1 className="text-gray-900 text-md font-bold mt-3">
          {data?.firstName} {data?.lastName}
        </h1>
        <h2 className="mt-2">{data?.description}</h2>
        <div className="flex mt-2">
          <div>
            توسط
            <bdi className="font-medium mx-1">25</bdi>
            نفر دنبال می‌شود
          </div>
          <div className="mr-4">
            <bdi className="font-medium mx-1">36</bdi>
            نفر را دنبال می‌کند
          </div>
        </div>
        <button className="rounded-3xl border-2 border-gray-700 text-gray-700 hover:text-white hover:bg-gray-700 font-medium px-5 py-1 mt-2 transition-all">
          تنظیمات حساب کاربری
        </button>
      </div>
    </div>
  );
};

export default Profile;
