import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  CommentOutlined as CommentOutlinedIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  PersonPin as PersonPinIcon,
  LockOpen as LockOpenIcon,
} from "@material-ui/icons";
import type { ISidebarLink } from "types";

const items: ISidebarLink[] = [
  {
    title: "مقالات",
    icon: <AssignmentIcon color="primary" />,
    path: "/dashboard/articles",
  },
  {
    title: "دسته بندی ها",
    icon: <CategoryOutlinedIcon color="primary" />,
    path: "/dashboard/categories",
  },
  {
    title: "کاربران",
    icon: <PeopleIcon color="primary" />,
    path: "/dashboard/users",
  },
  {
    title: "نقش ها",
    icon: <PersonPinIcon color="primary" />,
    path: "/dashboard/roles",
  },
  {
    title: "دسترسی ها",
    icon: <LockOpenIcon color="primary" />,
    path: "/dashboard/permissions",
  },
  {
    title: "نظرات",
    icon: <CommentOutlinedIcon color="primary" />,
    path: "/dashboard/comments",
  },
];

export default items;
