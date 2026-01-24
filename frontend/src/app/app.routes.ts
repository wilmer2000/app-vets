import { Routes } from '@angular/router';
import { noAuthGuard } from './core/modules/auth/guards/no-auth.guard';
import { authGuard } from './core/modules/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login-base/login-base.component').then((m) => m.LoginBaseComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    loadComponent: () => import('./pages/base/base.component').then((m) => m.BaseComponent),
    canActivate: [authGuard],
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
