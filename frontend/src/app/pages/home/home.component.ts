import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { User } from '../../core/modules/user/interfaces/user.interface';
import { PetsGridComponent } from '../../modules/pets/components/pets-grid/pets-grid.component';
import { UserService } from '../../core/modules/user/services/user.service';
import { ServicesListComponent } from '../../modules/services/components/services-list/services-list.component';

@Component({
  selector: 'app-home',
  imports: [ContainerComponent, PetsGridComponent, ServicesListComponent],
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
  private readonly userService = inject(UserService);

  currentUser = this.userService.currentUser as Signal<User>;
}
