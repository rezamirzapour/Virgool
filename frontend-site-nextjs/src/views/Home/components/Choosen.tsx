import { useMemo } from "react";
import { useQuery } from "react-query";
import { ArticleServices } from "src/services";
import SmallCard from "./SmallCard";
import BigCard from "./BigCard";

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
      <div className="grid md:grid-cols-2 gap-x-4 mt-4">
        <BigCard card={firstCard} />
        <div className="w-full">
          <SmallCard card={secondCard} />
          <SmallCard card={thirdCard} />
        </div>
      </div>
    </div>
  );
};

export default Choosen;
