import type { FC } from "react";
import type { GetProfileResponse } from "../../types";

interface IProps {
  profile: GetProfileResponse;
}

const Profile: FC<IProps> = ({ profile }) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <img
          src={profile.avatar}
          alt={profile.firstName}
          className="rounded-full"
        />
        <h1>
          {profile.firstName} {profile.lastName}
        </h1>
        <h2>{user.description}</h2>
        <div className="flex">
          <div>
            توسط
            <bdi>25</bdi>
            نفر دنبال می‌شود
          </div>
          <div className="mr-4">
            <bdi>36</bdi>
            نفر را دنبال می‌کند
          </div>
        </div>
        <button className="rounded-xl border-2 border-gray-700 text-gray-700 hover:text-white hover:bg-gray-700 px-5 py-1">
          تنظیمات حساب کاربری
        </button>
      </div>
    </div>
  );
};

export default Profile;
