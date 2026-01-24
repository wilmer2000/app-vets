import { Routes } from '@angular/router';
import { noAuthGuard } from './core/modules/auth/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [noAuthGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
