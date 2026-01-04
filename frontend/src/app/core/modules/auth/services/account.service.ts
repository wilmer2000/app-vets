import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Role } from '../enums/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly authService = inject(AuthService);

  getInfoUser() {
    return this.authService.userRole;
  }
}
