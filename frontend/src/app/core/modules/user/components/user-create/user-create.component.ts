import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { USER_FORM_CONSTANT } from '../../constants/user-form.constant';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  imports: [IconComponent, RouterLink, UserFormComponent],
  templateUrl: './user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  form = signal(USER_FORM_CONSTANT());
  save(): void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();

      return;
    }

    // const user = this.form().value as User;
    //
    // this.userService.create(user);
  }
}
