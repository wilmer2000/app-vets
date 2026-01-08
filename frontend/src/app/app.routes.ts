import { Routes } from '@angular/router';
import { authGuard } from './core/modules/auth/guards/auth.guard';
import { noAuthGuard } from './core/modules/auth/guards/no-auth.guard';
import { authAdminRoleGuard } from './core/modules/auth/guards/auth-admin-role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: '',
    loadComponent: () => import('./pages/base/base.component').then((m) => m.BaseComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then((m) => m.ProfileComponent)
      },
      {
        path: 'appointment',
        loadComponent: () =>
          import('./pages/appointment/appointment.component').then((m) => m.AppointmentComponent),
        children: [
          {
            path: 'create',
            loadComponent: () =>
              import(
                './modules/appointment/components/create-appointment/create-appointment.component'
              ).then((m) => m.CreateAppointmentComponent)
          },
          {
            path: '**',
            redirectTo: 'create',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'pets',
        loadComponent: () => import('./pages/pets/pets.component').then((m) => m.PetsComponent),
        children: [
          {
            path: ':petId',
            loadComponent: () =>
              import('./modules/pets/components/pet-profile/pet-profile.component').then(
                (m) => m.PetProfileComponent
              )
          }
        ]
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
        canActivate: [authGuard, authAdminRoleGuard],
        children: [
          {
            path: 'users',
            loadComponent: () =>
              import('./modules/users/component/users-list/users-list.component').then(
                (m) => m.UsersListComponent
              )
          }
          // {
          //   path: 'dashboard'
          // }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
