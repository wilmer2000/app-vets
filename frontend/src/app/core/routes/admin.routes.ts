import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/admin/admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../features/admin/components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('../modules/user/components/user-base/user-base.component').then(
            (m) => m.UserBaseComponent,
          ),
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('../modules/user/components/user-list/user-list.component').then(
                (m) => m.UserListComponent,
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('../modules/user/components/user-create/user-create.component').then(
                (m) => m.UserCreateComponent,
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('../modules/user/components/user-edit/user-edit.component').then(
                (m) => m.UserEditComponent,
              ),
          },
          { path: '**', redirectTo: 'list', pathMatch: 'full' },
        ],
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
