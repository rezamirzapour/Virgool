import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { toast } from "material-react-toastify";
import type { FindAllResponse } from "types";
import type { FilterOptions, Filters } from "components/AwesomeFilter2";
import { parseDate } from "utils";

interface IFetcherParams {
  offset: number;
  size: number;
}

interface IUseAwesomeTableParams<T extends FindAllResponse<any>> {
  fetcherCallback: (params: IFetcherParams) => Promise<AxiosResponse<T>>;
  fetchOnMount?: boolean;
  filterOptions?: FilterOptions;
}

export type IUseAwesomeTableReturnType = ReturnType<typeof useAwesomeTable>;

type Key = "field" | "label";

const calculateOffset = (size: number, page: number) => size * (page - 1);

export function useAwesomeTable<ResponseType extends FindAllResponse<any>>({
  fetcherCallback,
  fetchOnMount = true,
  filterOptions,
}: IUseAwesomeTableParams<ResponseType>) {
  const [response, setResponse] = useState<ResponseType>({
    result: [],
    message: "",
    count: 0,
  } as unknown as ResponseType);

  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });
  const [state, setState] = useState<FilterOptions>(
    filterOptions || { defaultFilter: "", filters: [] }
  );
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

  const fetchData = async (params: IFetcherParams & Record<string, any>) => {
    setLoading(true);
    try {
      const res = await fetcherCallback(params);
      setResponse(res.data);
    } catch (error) {
      toast.error("خطایی وجود دارد");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (newPage: number) => {
    setPagination((pre) => {
      fetchData({
        offset: calculateOffset(pagination.size, newPage),
        size: pagination.size,
        ...getValues(),
      });
      return { ...pre, page: newPage };
    });
  };

  const onSizeChange = (newSize: number) => {
    setPagination((prev) => {
      fetchData({
        size: newSize,
        offset: calculateOffset(newSize, pagination.page),
      });
      return { ...prev, size: newSize };
    });
  };

  const refetch = () => {
    fetchData({
      offset: calculateOffset(pagination.size, pagination.page),
      size: pagination.size,
      ...getValues(),
    });
  };

  const onFilterChange = (filters: Filters) => {
    setState((pre) => ({ ...pre, filters }));
  };

  const onDeleteFilter = (label: string) => {
    setState((pre) => ({
      ...pre,
      filters: pre.filters.map((f) => {
        if (f.label === label) {
          f.value = filterOptions?.filters.find(
            (f) => f.label === label
          )?.value;
        }
        return f;
      }),
    }));
  };

  const onApplyFilter = () => {
    fetchData({
      offset: calculateOffset(pagination.size, pagination.page),
      size: pagination.size,
      ...getValues(),
    });
  };

  useEffect(() => {
    if (fetchOnMount) fetchData({ offset: 0, size: 10 });
  }, [fetchOnMount]);

  return {
    register: {
      response,
      setResponse,
      loading,
      setLoading,
      pagination,
      onPageChange,
      onSizeChange,
      onFilterChange,
      onApplyFilter,
      getValues,
      filterOptions: state,
      onDeleteFilter,
    },
    getValues,
    refetch,
  };
}
