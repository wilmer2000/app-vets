import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/auth.enum';

export const authRoleGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRole = authService.userRole() as Role;

  if (authService.isLoggedIn() && userRole === Role.ADMIN) {
    return true;
  }

  void router.navigateByUrl('/login');
  return false;
};
