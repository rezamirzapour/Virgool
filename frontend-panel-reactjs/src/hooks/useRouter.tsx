import { useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

interface RouteOptions {
  query?: Record<string, string | number>;
  params?: Record<string, string | number>;
}

export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(
    () => ({
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },

      location,
      navigate,
    }),
    [params, location, navigate]
  );
}
