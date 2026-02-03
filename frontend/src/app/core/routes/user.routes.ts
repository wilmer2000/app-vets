import { Routes } from '@angular/router';

export const userRoutes: Routes = [{ path: '**', redirectTo: 'login', pathMatch: 'full' }];
