import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Role } from '../../modules/auth/enums/auth.enum';
import { AccountService } from '../../modules/auth/services/account.service';
import { User } from '../../modules/user/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly accountService = inject(AccountService);

  protected roleList = Role;
  currentUser = this.accountService.currentUser as Signal<User>;
}
