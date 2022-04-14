import { ReactNode } from "react";
import type { TooltipProps } from "@mui/material";
import { IUseAwesomeTableReturnType } from "components/AwesomeTable/items/useAwesomeTable";

export type IsHiddenType = boolean | ((item: any) => boolean);
export type IsDisabledType = boolean | ((item: any) => boolean);
export type TooltipType =
  | TooltipProps["title"]
  | ((item: any) => TooltipProps["title"]);
export type IconType = ReactNode | ((item: any) => ReactNode);
export type IsLoading = boolean | ((item: any) => boolean);

export type ActionBody = {
  hidden?: IsHiddenType;
  disabled?: IsDisabledType;
  icon: IconType;
  tooltip: TooltipType;
  loading?: IsLoading;
  onClick: (item: any) => void;
};

export type IAction = ActionBody | ((item: any) => ActionBody);

interface IndexedSignuate {
  [key: string]: any;
}

export type IColumn<T = any> =
  | {
      field: T extends IndexedSignuate ? keyof T : string;
      title: string | ReactNode;
      render?: (rd: T) => string | ReactNode;
      sorting?: boolean;
    }
  | {
      field?: string | ReactNode;
      title: string | ReactNode;
      render: (rd: T) => string | ReactNode;
      sorting?: boolean;
    };

export type ISortValue = null | "asc" | "desc";

export interface ISort {
  field: string;
  value: ISortValue;
}

export interface AwesomeTableProps {
  register: IUseAwesomeTableReturnType["register"];
}
