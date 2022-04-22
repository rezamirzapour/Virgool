import { useMutation } from "react-query";
import { AuthServices } from "src/services";
import { useRouter } from "next/router";
import { toast } from "material-react-toastify";

export function useLoginMutation() {
  const router = useRouter();
  return useMutation(AuthServices.login, {
    onSuccess: () => {
      toast.success("با موفقیت وارد شدید");
      router.push("/");
    },
  });
}
