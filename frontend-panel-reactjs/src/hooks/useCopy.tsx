import copyToClipboard from "copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { toast } from "material-react-toastify";

export function useCopy() {
  const location = useLocation();
  const copy = (text: string, message: string = "کپی شد") => {
    copyToClipboard(text);
    toast.success(message);
  };
  const copyCurrentUrl = (message: string = "کپی شد") =>
    void copy(location.pathname, message);
  return { copy, copyCurrentUrl };
}
