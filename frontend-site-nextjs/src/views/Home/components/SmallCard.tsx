import Link from "next/link";
import type { ArticleResult } from "src/types";
import { FC, useState } from "react";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  card?: ArticleResult;
}

const SmallCard: FC<IProps> = ({ card, ...rest }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

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
      <div className="p-4 flex flex-col justify-between w-full">
        <div>
          <Link href={`/articles/${card?.id}/show`}>
            <a>{card?.title}</a>
          </Link>
          <div>
            {card?.plainContent?.slice(0, 128)}{" "}
            {card?.plainContent?.length > 128 && "..."}
          </div>
        </div>
        <div className="flex justify-between w-full">
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

export default SmallCard;
