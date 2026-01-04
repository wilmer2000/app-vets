import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { AuthService } from '../../core/modules/auth/services/auth.service';
import { Role } from '../../core/modules/auth/enums/auth.enum';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `
})
export class HomeComponent {
  private readonly authService = inject(AuthService);

  isLoggedIn = linkedSignal<boolean>(() => this.authService.isLoggedIn);
  userRol = linkedSignal<Role>(() => this.authService.userRole as Role);
  readonly roleList = Role;
}
