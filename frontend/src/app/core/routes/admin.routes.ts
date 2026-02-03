import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../pages/outlet-base/outlet-base.component').then((m) => m.OutletBaseComponent),
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
          import('../../pages/outlet-base/outlet-base.component').then(
            (m) => m.OutletBaseComponent,
          ),
        loadChildren: () => import('./user.routes').then((m) => m.userRoutes),
      },
      {
        path: 'entity',
        loadComponent: () =>
          import('../../pages/outlet-base/outlet-base.component').then(
            (m) => m.OutletBaseComponent,
          ),
        loadChildren: () => import('./entity.routes').then((m) => m.entityRoutes),
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
