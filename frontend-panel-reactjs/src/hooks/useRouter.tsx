import { useMemo } from "react";
import {
    useParams,
    useLocation,
    useHistory,
    useRouteMatch,
} from "react-router-dom";
import queryString from "query-string";
import routes from 'routes'
import { useCallback } from "react";
import { RouteName } from 'routes';

interface RouteOptions {
    query?: Record<string, string | number>;
    params?: Record<string, string | number>
}

export default function useRouter() {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const navigate = useCallback((name: RouteName, options?: RouteOptions) => {
        let path: string = routes.find(r => r.name === name)?.path as string ?? '/'
        if (options?.params) {

            for (let key in options.params) {
                path = path.replace(`:${key}`, options.params[key].toString())
            }
        }
        if (options?.query) {
            for (let key in options.query) {
                path = `${path}&${key}=${options.query[key]}`
            }
        }
        history.push(path)
    }, []);
    // Return our custom router object
    // Memoize so that a new object is only returned if something changes
    return useMemo(() => ({
        push: history.push,
        replace: history.replace,
        pathname: location.pathname,
        query: {
            ...queryString.parse(location.search),
            ...params,
        },
        match,
        location,
        history,
        navigate

    }), [params, match, location, history, navigate]);
}