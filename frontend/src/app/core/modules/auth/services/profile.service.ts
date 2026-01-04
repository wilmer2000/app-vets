import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser.asReadonly();

}
