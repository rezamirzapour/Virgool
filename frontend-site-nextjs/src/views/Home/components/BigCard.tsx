import Link from "next/link";
import type { ArticleResult } from "src/types";
import { FC, useState } from "react";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  card?: ArticleResult;
}

const BigCard: FC<IProps> = ({ card, ...rest }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

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
          <button onClick={toggleBookmark}>
            {bookmarked ? (
              <MdOutlineBookmark className="text-3xl" />
            ) : (
              <MdOutlineBookmarkBorder className="text-3xl" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default BigCard;
