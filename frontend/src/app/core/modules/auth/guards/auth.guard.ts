import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/auth.enum';

export function authGuard(): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.state().isLoggedIn) {
    return true;
  }

  router.navigateByUrl('/login').then();
  return false;
}
