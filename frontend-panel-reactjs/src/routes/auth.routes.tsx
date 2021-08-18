import { Login, Register } from "pages";
import Route from './route.interface';

const authRoutes: Route[] = [
  {
    path: "/auth/login",
    component: Login,
    name: 'auth.login',
    auth: false,
  },
  {
    path: "/auth/register",
    component: Register,
    name: 'auth.register',
    auth: false,
  },
];

export default authRoutes;
