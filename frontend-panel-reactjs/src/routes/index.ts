import RouteType from './route.interface';
import { default as dashboardRoutes } from "./dashboard.routes";
import { default as authRoutes } from "./auth.routes";

type UnArray<T extends readonly any[]> = T extends ReadonlyArray<infer U> ? U : never

const routes: RouteType[] = [
    ...dashboardRoutes,
    ...authRoutes
];

function specifyRoute<T extends readonly RouteType[]>(x: T) {
    return x;
}
const x = specifyRoute([
    ...routes
] as const)

export type RouteName = UnArray<typeof x>["name"]
export { dashboardRoutes, authRoutes }
export default routes;
export * from './route.interface'