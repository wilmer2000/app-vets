import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, NavbarItemComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
