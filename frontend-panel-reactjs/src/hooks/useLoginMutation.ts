import { useMutation } from "react-query";
import { AuthServices } from "services";
import { toast } from "material-react-toastify";
import { useNavigate } from "react-router-dom";

export function useLoginMutation() {
  const naviagate = useNavigate();
  return useMutation(AuthServices.login, {
    onSuccess: (data) => {
      toast.success("با موفقیت وارد شدید");
      localStorage.setItem("token", data.access_token);
      naviagate("/dashboard");
    },
    onError: () => {
      toast.error("مشکلی وجود دارد");
    },
  });
}
