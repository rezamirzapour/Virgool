import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { ArticleServices } from "services";
import SmallCard from "./SmallCard";

const Choosen = () => {
  const { data: articles } = useQuery("choosen-articles", () =>
    ArticleServices.findAll().then(({ data }) => data)
  );
  const { firstCard, secondCard, thirdCard } = useMemo(
    () => ({
      firstCard: articles?.result.at(0),
      secondCard: articles?.result.at(1),
      thirdCard: articles?.result.at(2),
    }),
    [articles]
  );

  return (
    <div>
      <h3>منتخب های ویرگول</h3>
      <div className="flex mt-4">
        <article className="max-w-[466px] w-full">
          <img
            className="h-[220px] object-cover"
            width="100%"
            src={firstCard?.thumbnail.fullPath}
            alt={firstCard?.title}
          />
          <div className="py-4">
            <div className="h-[200px]">
              <Link href={`/articles/${firstCard?.id}/show`}>
                <a>{firstCard?.title}</a>
              </Link>
              <p
                className="mt-4"
                style={{ fontFamily: "vazir !important" }}
                dangerouslySetInnerHTML={{ __html: firstCard?.content }}
              />
            </div>
            <div className="flex justify-between">
              <div>
                <span className="block">
                  {firstCard?.author.firstName} {firstCard?.author.lastName}
                </span>
                <span>
                  {new Date(firstCard?.createdAt).toLocaleString("fa")}
                </span>
              </div>
            </div>
          </div>
        </article>

        <div className="max-w-[466px] w-full mr-4">
          <SmallCard card={secondCard} />
          <SmallCard card={thirdCard} />
        </div>
      </div>
    </div>
  );
};

export default Choosen;
