import { ReactChild } from "react";
import { IAction, IColumn, ISort, ISortValue } from "./interface";
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  ArrowLeft as ArrowLeftIcon,
} from "@mui/icons-material";
import { FacebookCircularProgress } from "./Loading";

export const isHidden = <T extends any>(action: IAction, item: T): boolean =>
  typeof action === "function"
    ? typeof action(item).hidden === "function"
      ? (action(item).hidden as CallableFunction)(item)
      : action(item).hidden
    : typeof action.hidden === "function"
    ? action.hidden(item)
    : action.hidden;

export const isDisabled = <T extends any>(action: IAction, item: T) =>
  typeof action === "function"
    ? typeof action(item)?.disabled === "function"
      ? (action(item)?.disabled as CallableFunction)(item)
      : action(item)?.disabled
    : typeof action?.disabled === "function"
    ? action?.disabled(item)
    : action?.disabled;

export const getIcon = <T extends any>(action: IAction, item: T) => {
  if (typeof action === "function") {
    if (action(item).loading) {
      return <FacebookCircularProgress />;
    }
  } else {
    if (action.loading) {
      return <FacebookCircularProgress />;
    }
  }
  return typeof action === "function"
    ? typeof action(item)?.icon === "function"
      ? (action(item)?.icon as CallableFunction)(item)
      : action(item)?.icon
    : typeof action?.icon === "function"
    ? action?.icon(item)
    : action?.icon;
};
export const getTooltipTitle = <T extends any>(action: IAction, item: T) =>
  typeof action === "function" ? action(item).tooltip : action.tooltip;

export const getOnClickFunction = <T extends any>(action: IAction, item: T) =>
  typeof action === "function"
    ? action(item)?.onClick?.(item)
    : action?.onClick?.(item);

export const getSortIcon = (
  sorts: ISort[],
  column: IColumn,
  handleSort: (column: IColumn, value: ISortValue) => void,
  classes: any
): ReactChild => {
  const value = sorts.find((s) => s.field === column.field)?.value;
  switch (value) {
    case null:
      return (
        <ArrowLeftIcon
          sx={{ transform: "translateY(10px)" }}
          onClick={() => handleSort(column, "asc")}
          className={classes.sortIcon}
        />
      );
    case "asc":
      return (
        <ArrowDropDownIcon
          onClick={() => handleSort(column, "desc")}
          className={classes.sortIcon}
        />
      );
    case "desc":
      return (
        <ArrowDropUpIcon
          onClick={() => handleSort(column, null)}
          className={classes.sortIcon}
        />
      );
    default:
      return <></>;
  }
};
