import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControlComponent } from '../../../form/form-control/form-control.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSwitchComponent } from '../../../form/form-switch/form-switch.component';
import { FormSelectOpts } from '../../../form/form.interface';
import { Roles } from '../../enums/roles.enum';

@Component({
  selector: 'app-user-form',
  imports: [FormControlComponent, FormSwitchComponent, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  get isActiveControl(): FormControl {
    return this.form().get('isActive') as FormControl;
  }

  get addressFormGroup(): FormGroup {
    return this.form().get('address') as FormGroup;
  }

  get contactFormGroup(): FormGroup {
    return this.form().get('contact') as FormGroup;
  }

  get rolesOptions(): FormSelectOpts[] {
    return Object.keys(Roles).map((role) => ({ label: role, value: role.toUpperCase() as Roles }));
  }

  form = input.required<FormGroup>();

  changeIsActive(state: boolean): void {
    this.isActiveControl.patchValue(state);
  }
}
