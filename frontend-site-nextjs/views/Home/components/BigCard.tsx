import Link from "next/link";
import { ArticleResult } from "types";
import type { FC } from "react";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  card?: ArticleResult;
}

const BigCard: FC<IProps> = ({ card, ...rest }) => {
  return (
    <article className="w-full" {...rest}>
      <img
        className="h-[220px] object-cover"
        width="100%"
        src={card?.thumbnail.fullPath}
        alt={card?.title}
      />
      <div className="py-4 h-[calc(100%-220px)] flex flex-col justify-between">
        <div>
          <Link href={`/articles/${card?.id}/show`}>
            <a>{card?.title}</a>
          </Link>
          <p className="mt-4">
            {card?.plainContent?.slice(0, 128)}{" "}
            {card?.plainContent?.length > 128 && "..."}
          </p>
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

export default BigCard;
