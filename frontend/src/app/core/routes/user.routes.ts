import { Routes } from '@angular/router';

export const userRoutes: Routes = [
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
];
