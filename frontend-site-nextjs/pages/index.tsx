import type { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "react-query";
import { ArticleServices } from "src/services";
import { Home } from "src/views";

export default function HomePage() {
  return <Home />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("choosen-articles", () =>
    ArticleServices.findAll({ size: 10, offset: 0, paginate: true }).then(
      ({ data }) => data
    )
  );
  await queryClient.prefetchQuery("articles", () =>
    ArticleServices.findAll().then(({ data }) => data)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
