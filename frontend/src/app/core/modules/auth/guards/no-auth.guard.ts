import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function noAuthGuard(): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    void router.navigateByUrl('/home');
    return false;
  }

  return true;
}
