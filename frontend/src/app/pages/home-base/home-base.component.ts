import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/modules/auth/services/auth.service';
import { Role } from '../../core/modules/auth/enums/auth.enum';

@Component({
  selector: 'app-home-base',
  imports: [],
  templateUrl: './home-base.component.html',
  styles: ``,
})
export class HomeBaseComponent {
  private readonly authService = inject(AuthService);

  isAdmin = computed(() => this.authService.state().role === Role.Admin);
}
