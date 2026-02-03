import { Routes } from '@angular/router';
import { noAuthGuard } from './core/modules/auth/guards/no-auth.guard';
import { authGuard } from './core/modules/auth/guards/auth.guard';
import { authAdminRoleGuard } from './core/modules/auth/guards/auth-admin-role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    loadComponent: () => import('./pages/base/base.component').then((m) => m.BaseComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        canActivate: [authAdminRoleGuard],
        loadChildren: () => import('./core/routes/admin.routes').then((m) => m.adminRoutes),
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
