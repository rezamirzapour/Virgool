import type { ReactNode } from "react";
import clsx from "clsx";

interface IProps {
  loading?: boolean;
  color?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  children: ReactNode;
}

export default function Button({
  loading,
  color = "primary",
  type = "button",
  children,
}: IProps) {
  return (
    <button
      type={type}
      disabled={loading}
      className={clsx(
        "text-base font-medium py-2.5 w-full rounded flex justify-center items-center transition-1",
        { "bg-gray-500 cursor-none": loading },
        {
          "text-gray-100 bg-blue-500 hover:bg-blue-400":
            !loading && color == "primary",
        },
        {
          "text-gray-800 bg-yellow-500 hover:bg-yellow-30":
            !loading && color == "secondary",
        }
      )}
    >
      {children}
    </button>
  );
}
