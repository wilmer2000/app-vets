import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Role } from '../../modules/auth/enums/auth.enum';
import { AccountService } from '../../modules/auth/services/account.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly accountService = inject(AccountService);

  userRole = linkedSignal(() => this.accountService.getInfoUser());
  protected roleList = Role;
}
