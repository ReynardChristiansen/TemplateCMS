import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administrator',
    },
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./user/user.component').then((m) => m.UserComponent),
        data: {
          title: 'User',
        },
      },
      {
        path: 'user-edit',
        loadComponent: () => import('./user-edit/user-edit.component').then(m => m.UserEditComponent),
        data: {
          title: 'User-Edit'
        }
      },
      {
        path: 'user-group',
        loadComponent: () => import('./user-group/user-group.component').then(m => m.UserGroupComponent),
        data: {
          title: 'User-Group'
        }
      },
      {
        path: 'addnewuser',
        loadComponent: () => import('./add-new-user/add-new-user.component').then(m => m.AddNewUserComponent),
        data: {
          title: 'Add-New-User'
        }
      },
      {
        path: 'user-group-edit',
        loadComponent: () => import('./user-group-edit/user-group-edit.component').then(m => m.UserGroupEditComponent),
        data: {
          title: 'User-Group-Edit'
        }
      },
      {
        path: 'user-group-add',
        loadComponent: () => import('./user-group-add/user-group-add.component').then(m => m.UserGroupAddComponent),
        data: {
          title: 'User-Group-Add'
        }
      },
    ]
  }
];
