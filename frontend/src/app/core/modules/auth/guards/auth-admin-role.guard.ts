import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/auth.enum';

export const authAdminRoleGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.state().role === Role.ADMIN) {
    return true;
  }

  void router.navigateByUrl('/login');
  return false;
};
