import { Routes } from '@angular/router';
import { authGuard } from './core/modules/auth/guards/auth.guard';
import { noAuthGuard } from './core/modules/auth/guards/no-auth.guard';
import { authAdminRoleGuard } from './core/modules/auth/guards/auth-admin-role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/core/login/login.component').then((m) => m.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: '',
    loadComponent: () => import('./pages/core/base/base.component').then((m) => m.BaseComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'appointment',
        loadComponent: () =>
          import('./pages/appointment/appointment.component').then((m) => m.AppointmentComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/core/profile/profile.component').then((m) => m.ProfileComponent)
      },
      {
        path: 'pets',
        loadComponent: () => import('./pages/pet/pet.component').then((m) => m.PetComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./modules/pets/components/pets-list/pets-list.component').then(
                (m) => m.PetsListComponent
              )
          },
          {
            path: 'profile/:petId',
            loadComponent: () =>
              import('./modules/pets/components/pet-profile/pet-profile.component').then(
                (m) => m.PetProfileComponent
              )
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./modules/pets/components/pet-profile/pet-profile.component').then(
                (m) => m.PetProfileComponent
              )
          },
          { path: '**', redirectTo: 'pets/list', pathMatch: 'full' }
        ]
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
        canActivate: [authGuard, authAdminRoleGuard],
        children: [
          {
            path: 'user',
            loadComponent: () =>
              import('./pages/core/user/user.component').then((m) => m.UserComponent)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
