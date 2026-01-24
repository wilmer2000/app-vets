import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Role } from '../../modules/auth/enums/auth.enum';
import { User } from '../../modules/user/interfaces/user.interface';
import { UserService } from '../../modules/user/services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly userService = inject(UserService);

  protected roleList = Role;
  currentUser = this.userService.currentUser as Signal<User>;
}
