import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/pages/base/base.component').then((m) => m.BaseComponent)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
