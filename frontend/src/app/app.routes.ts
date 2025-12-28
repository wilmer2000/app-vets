import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./core/pages/base/base.component').then((m) => m.BaseComponent)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
