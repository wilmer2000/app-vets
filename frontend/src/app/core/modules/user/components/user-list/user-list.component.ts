import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [IconComponent],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly userService = inject(UserService);

  ngOnInit() {
    this.userService.findAll();
  }
}
