import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControlComponent } from '../../../form/form-control/form-control.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FormSwitchComponent } from '../../../form/form-switch/form-switch.component';

@Component({
  selector: 'app-user-form',
  imports: [FormControlComponent, FormSwitchComponent],
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  get isActiveControl(): FormControl {
    return this.form().get('isActive') as FormControl;
  }

  form = input.required<FormGroup>();

  changeIsActive(state: boolean): void  {
    this.isActiveControl.patchValue(state);
  }
}
