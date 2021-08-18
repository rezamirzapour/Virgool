import Route from './route.interface';
import {
  Dashboard,
  ArticlesList,
  ArticlesEdit,
  ArticlesCreate,
  UsersList,
  CategoriesEdit,
  CategoriesCreate,
  CategoriesList,
  RolesEdit,
  RolesCreate,
  RolesList,
} from "pages/Dashboard";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  CommentOutlined as CommentOutlinedIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  PersonPin as PersonPinIcon,
  LockOpen as LockOpenIcon
} from "@material-ui/icons";


const dashboardRoutes: Route[] = [
  {
    path: "/dashboard/articles/:id/edit",
    component: ArticlesEdit,
    show: false,
    name: 'articles.edit',
    auth: true,
    exact: true,
  },
  {
    path: "/dashboard/articles/create",
    component: ArticlesCreate,
    show: false,
    name: 'articles.create',
    auth: true,
    exact: true,
  },
  {
    title: "مقالات",
    path: "/dashboard/articles",
    component: ArticlesList,
    icon: <AssignmentIcon color="primary" />,
    show: true,
    name: 'articles.list',
    auth: true,
    exact: true,
  },
  {
    title: "کاربران",
    path: "/dashboard/users",
    component: UsersList,
    icon: <PeopleIcon color="primary" />,
    show: true,
    name: 'users.list',
    auth: true,
    exact: true,
  },
  {
    path: "/dashboard/categories/:id/edit",
    component: CategoriesEdit,
    name: 'categories.edit',
    auth: true,
    exact: true,
  },
  {
    path: "/dashboard/categories/create",
    component: CategoriesCreate,
    name: 'categories.create',
    auth: true,
    exact: true,
  },
  {
    title: "دسته ها",
    path: "/dashboard/categories",
    component: CategoriesList,
    icon: <CategoryOutlinedIcon color="primary" />,
    show: true,
    name: 'categories.list',
    auth: true,
    exact: true,
  },
  {
    path: "/dashboard/roles/create",
    component: RolesCreate,
    name: 'roles.create',
    auth: true,
    exact: true,
  },
  {
    path: "/dashboard/roles/:id/edit",
    component: RolesEdit,
    show: false,
    name: 'roles.edit',
    auth: true,
    exact: true,
  },
  {
    title: "نقش ها",
    path: "/dashboard/roles",
    component: RolesList,
    icon: <PersonPinIcon color="primary" />,
    show: true,
    name: 'roles.list',
    auth: true,
    exact: true,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    show: false,
    name: 'dashboard',
    auth: true,
    exact: true,
  },
];

export default dashboardRoutes;
