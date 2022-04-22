import { FC } from "react";
import type { CategoryResult } from "src/types";

interface IProps {
  card: CategoryResult;
}

const Card: FC<IProps> = ({ card }) => {
  return (
    <div className="cursor-pointer flex h-20 items-center justify-center bg-blue-600 rounded-lg text-white font-bold">
      {card.title}
    </div>
  );
};

export default Card;
