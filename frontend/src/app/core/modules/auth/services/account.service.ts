import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly authService = inject(AuthService);

  getInfoUser() {
    return this.authService.userRole;
  }
}
