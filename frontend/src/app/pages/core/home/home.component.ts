import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ContainerComponent } from '../../../shared/components/container/container.component';
import { ProfileService } from '../../../core/modules/auth/services/profile.service';
import { User } from '../../../core/modules/user/interfaces/user.interface';

@Component({
  selector: 'app-home',
  imports: [ContainerComponent],
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
  private readonly accountService = inject(ProfileService);
  currentUser: Signal<User> = this.accountService.currentUser as Signal<User>;
}
