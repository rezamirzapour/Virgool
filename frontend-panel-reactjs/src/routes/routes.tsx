import {
  ArticlesList,
  ArticlesCreate,
  ArticlesEdit,
  UsersList,
  RolesList,
  RolesCreate,
  RolesEdit,
  PermissionsList,
  PermissionsCreate,
  PermissionsEdit,
  CategoriesList,
  CategoriesCreate,
  CategoriesEdit,
  Dashboard,
  Login,
  Register,
} from "pages";
import { Auth, Dashboard as DashboardLayout } from "layouts";
import { RouteObject, Outlet, Navigate } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "articles",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <ArticlesList />,
          },
          {
            path: "create",
            element: <ArticlesCreate />,
          },
          {
            path: ":id/edit",
            element: <ArticlesEdit />,
          },
        ],
      },
      {
        path: "users",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <UsersList />,
          },
        ],
      },
      {
        path: "roles",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <RolesList />,
          },
          {
            path: "create",
            element: <RolesCreate />,
          },
          {
            path: ":id/edit",
            element: <RolesEdit />,
          },
        ],
      },
      {
        path: "permissions",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <PermissionsList />,
          },
          {
            path: "create",
            element: <PermissionsCreate />,
          },
          {
            path: ":id/edit",
            element: <PermissionsEdit />,
          },
        ],
      },
      {
        path: "categories",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <CategoriesList />,
          },
          {
            path: "create",
            element: <CategoriesCreate />,
          },
          {
            path: ":id/edit",
            element: <CategoriesEdit />,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default routes;
