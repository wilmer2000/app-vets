import { Routes } from '@angular/router';

export const entityRoutes: Routes = [{ path: '**', redirectTo: 'login', pathMatch: 'full' }];
