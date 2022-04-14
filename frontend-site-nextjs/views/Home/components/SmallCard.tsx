import Link from "next/link";
import { ArticleResult } from "types";
import type { FC } from "react";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  card?: ArticleResult;
}

const SmallCard: FC<IProps> = ({ card, ...rest }) => {
  return (
    <article
      className="flex bg-gray-100 mb-4 last:mb-0 max-h-[220px]"
      {...rest}
    >
      <img
        className="w-[170px] h-[220px] object-cover"
        src={card?.thumbnail.fullPath}
        alt={card?.title}
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <Link href={`/articles/${card?.id}/show`}>
            <a>{card?.title}</a>
          </Link>
          <div>
            {card?.plainContent?.slice(0, 128)}{" "}
            {card?.plainContent?.length > 128 && "..."}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="block">
              {card?.author.firstName} {card?.author.lastName}
            </span>
            <span>{new Date(card?.createdAt).toLocaleString("fa")}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SmallCard;
