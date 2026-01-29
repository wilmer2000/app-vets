import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { USER_FORM_CONSTANT } from '../../constants/user-form.constant';

@Component({
  selector: 'app-user-create',
  imports: [IconComponent, RouterLink, UserFormComponent],
  templateUrl: './user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  form = signal(USER_FORM_CONSTANT());
}
