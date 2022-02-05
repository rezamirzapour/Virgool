import type { GetServerSideProps, NextPage } from "next";
import { Profile } from "views";
import { QueryClient, dehydrate } from "react-query";
import { MeServices } from "services";

const ProfilePage: NextPage = ({ profile }) => {
  return <Profile profile={profile} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("profile", MeServices.getProfile);

  return {
    props: {
      profile: dehydrate(queryClient),
    },
  };
};

export default ProfilePage;
