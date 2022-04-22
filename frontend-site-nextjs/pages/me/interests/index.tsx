import { NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import { CategoriesServices } from "src/services";
import { Interests } from "src/views/Interests";

const InterestsPage: NextPage = () => {
  return <Interests />;
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("categories", () =>
    CategoriesServices.findAll({ paginate: false }).then(({ data }) => data)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default InterestsPage;
