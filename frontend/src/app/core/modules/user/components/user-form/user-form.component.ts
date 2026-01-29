import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormControlComponent } from '../../../form/form-control/form-control.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { USER_FORM_CONSTANT } from '../../constants/user-form.constant';
import { FormSwitchComponent } from '../../../form/form-switch/form-switch.component';

@Component({
  selector: 'app-user-form',
  imports: [FormControlComponent, FormSwitchComponent],
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  private readonly userService = inject(UserService);

  get isActiveControl(): FormControl {
    return this.form().get('isActive') as FormControl;
  }

  form = input<FormGroup>(USER_FORM_CONSTANT());
}
