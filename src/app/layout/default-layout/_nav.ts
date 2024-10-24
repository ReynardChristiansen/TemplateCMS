import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   iconComponent: { name: 'cil-speedometer' },
  // },
  {
    title: true,
    name: 'Administrator',
  },
  {
    name: 'Administrator',
    url: '/base',
    // iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'User',
        url: '/administrator/user',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'User-Group',
        url: '/administrator/user-group',
        icon: 'nav-icon-bullet',
      },
    ],
  },
];
