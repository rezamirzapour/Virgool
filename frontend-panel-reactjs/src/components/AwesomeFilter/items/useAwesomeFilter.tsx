import { useState } from "react";
import { Filters, FilterOptions } from "./interface";
import { parseDate } from "utils";

type Key = "field" | "label";

export type UseAwesomeFilterReturnType = ReturnType<typeof useAwesomeFilter>;
export default function useAwesomeFilter(filterOptions: FilterOptions) {
  const [state, setState] = useState<FilterOptions>(filterOptions);

  const getValues = (key: Key = "field") => {
    const params: Record<string, any> = {};
    state.filters.forEach((filter) => {
      switch (filter.type) {
        case "DATE_TIME_RANGE": {
          if (filter.value.start !== null && filter.value.end !== null) {
            if (key === "label")
              params[filter[key]] = `از ${parseDate(
                filter.value.start
              )} تا ${parseDate(filter.value.end)}`;
            else {
              params[filter.field.start as string] = filter.value.start;
              params[filter.field.end as string] = filter.value.end;
            }
          }
          break;
        }
        case "NUMBER_RANGE": {
          if (filter.value.start !== null && filter.value.end !== null) {
            if (key === "label")
              params[
                filter[key]
              ] = `از ${filter.value.start} تا ${filter.value.end}`;
            else {
              params[filter.field.start as string] = filter.value.start;
              params[filter.field.end as string] = filter.value.end;
            }
          }
          break;
        }
        case "SELECT": {
          if (key === "label") {
            params[filter[key]] =
              filter.options.find((f) => f.value === filter.value)?.label ?? "";
          } else {
            params[filter[key] as string] = filter.value;
          }
          break;
        }
        default: {
          if (typeof filter.field === "string") {
            if (filter.value) params[filter[key] as string] = filter.value;
          }
        }
      }
    });
    return params;
  };

  const onFilterChange = (filters: Filters) =>
    setState((pre) => ({ ...pre, filters }));
  const onDeleteFilter = (label: string) => {
    setState((pre) => ({
      ...pre,
      filters: pre.filters.map((f) => {
        if (f.label === label) {
          f.value = filterOptions.filters.find((f) => f.label === label)?.value;
        }
        return f;
      }),
    }));
  };
  return {
    getValues,
    register: {
      onFilterChange,
      getValues,
      filterOptions: state,
      onDeleteFilter,
    },
  };
}
