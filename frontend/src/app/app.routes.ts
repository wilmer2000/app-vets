import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./core/pages/base/base.component').then((m) => m.BaseComponent)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
