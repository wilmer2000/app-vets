import { Routes } from '@angular/router';

export const entityRoutes: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('../../features/entity/components/entity-list/entity-list.component').then(
        (m) => m.EntityListComponent,
      ),
  },
  { path: '**', redirectTo: 'list', pathMatch: 'full' },
];
