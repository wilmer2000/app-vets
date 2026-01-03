import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { noAuthGuard } from './core/auth/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'app',
    loadComponent: () => import('./pages/base/base.component').then((m) => m.BaseComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'appointment',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
