import type { GetServerSideProps, NextPage } from "next";
import { Profile } from "src/views";
import { QueryClient, dehydrate } from "react-query";
import { MeServices } from "src/services";
import { AuthOperations } from "src/utils";

const ProfilePage: NextPage = () => {
  return <Profile />;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("profile", () =>
    MeServices.getProfile(AuthOperations.generateAuthHeaderFromReq(req)).then(
      ({ data }) => data
    )
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProfilePage;
