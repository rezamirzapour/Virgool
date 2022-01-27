import { useQuery } from "react-query";
import { MeServices } from "services";

export function useGetProfileQuery() {
  return useQuery("profile", () =>
    MeServices.getProfile().then((res) => res.data)
  );
}
