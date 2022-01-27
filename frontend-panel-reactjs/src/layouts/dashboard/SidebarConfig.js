import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'داشبرد',
    path: '/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'مقالات',
    path: '/dashboard/articles',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'کاربران',
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  },
  {
    title: 'نقش ها',
    path: '/dashboard/roles',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'دسترسی ها',
    path: '/dashboard/permissions',
    icon: getIcon(lockFill)
  },
  {
    title: 'دسته بندی ها',
    path: '/dashboard/categories',
    icon: getIcon(personAddFill)
  },
  {
    title: 'نظرات',
    path: '/dasboard/comments',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
