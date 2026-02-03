import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../enums/auth.enum';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private readonly router = inject(Router);

  redirectByRol(rol: Role): void {
    switch (rol) {
      case Role.Admin:
        this.router.navigate(['/admin']).then();
    }
  }
  redirectTo(path: string): void {
    this.router.navigateByUrl(path).then();
  }
}
