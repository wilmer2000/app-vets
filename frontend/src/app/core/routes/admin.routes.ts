import { Routes } from '@angular/router';

export const adminRoutes: Routes = [{ path: '**', redirectTo: 'login', pathMatch: 'full' }];
