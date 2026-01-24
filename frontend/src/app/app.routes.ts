import { Routes } from '@angular/router';
import { noAuthGuard } from './core/modules/auth/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    loadComponent: () => import('./pages/base/base.component').then((m) => m.BaseComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home-base/home-base.component').then((m) => m.HomeBaseComponent),
      },

      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
