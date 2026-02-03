import { Routes } from '@angular/router';

export const entityRoutes: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('../../modules/entity/components/entity-list/entity-list.component').then(
        (m) => m.EntityListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('../../modules/entity/components/entity-create/entity-create.component').then(
        (m) => m.EntityCreateComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../../modules/entity/components/entity-edit/entity-edit.component').then(
        (m) => m.EntityEditComponent,
      ),
  },
  { path: '**', redirectTo: 'list', pathMatch: 'full' },
];
