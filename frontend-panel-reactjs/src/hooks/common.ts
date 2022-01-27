import { useMutation } from "react-query";
import { toast } from "material-react-toastify";

export function useCreateMutation<T extends (...args: any) => any>(httpFn: T) {
  return useMutation<unknown, Awaited<ReturnType<T>>, Parameters<T>[0]>(
    (data) => httpFn(data),
    {
      onSuccess: () => {
        toast.success("با موفقیت ایجاد شد");
      },
      onError: () => {
        toast.error("مشکلی وجود دارد");
      },
    }
  );
}

export function useUpdateMutation<T extends (...args: any) => any>(
  id: number,
  httpFn: T
) {
  return useMutation<unknown, Awaited<ReturnType<T>>, Parameters<T>[1]>(
    (data) => httpFn(id, data),
    {
      onSuccess: () => {
        toast.success("با موفقیت بروزرسانی شد");
      },
      onError: () => {
        toast.error("مشکلی وجود دارد");
      },
    }
  );
}

export function useDeleteMutation<T extends (id: number) => any>(httpFn: T) {
  return useMutation<unknown, Awaited<ReturnType<T>>, number>(httpFn, {
    onSuccess: () => {
      toast.success("با موفقیت حذف شد");
    },
    onError: () => {
      toast.error("مشکلی وجود دارد");
    },
  });
}
