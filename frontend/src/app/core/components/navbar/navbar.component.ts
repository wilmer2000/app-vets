import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Role } from '../../modules/auth/enums/auth.enum';
import { ProfileService } from '../../modules/auth/services/profile.service';
import { User } from '../../modules/user/interfaces/user.interface';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly accountService = inject(ProfileService);
  private readonly authService = inject(AuthService);

  protected roleList = Role;
  currentUser = this.accountService.currentUser as Signal<User>;

  logout() {
    this.authService.logout();
  }
}
