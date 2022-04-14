import type { FC } from "react";
import Header from "./Header";

const Main: FC = ({ children }) => {
  return (
    <div className="max-w-[1160px] m-auto">
      <Header />
      <div className="pt-8">{children}</div>
    </div>
  );
};

export default Main;
