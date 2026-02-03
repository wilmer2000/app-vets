import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControlComponent } from '../../../../core/modules/form/form-control/form-control.component';
import { FormSwitchComponent } from '../../../../core/modules/form/form-switch/form-switch.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  imports: [FormControlComponent, FormSwitchComponent, ReactiveFormsModule],
  templateUrl: './entity-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityFormComponent {
  get isActiveControl(): FormControl {
    return this.form().get('isActive') as FormControl;
  }
  get addressFormGroup(): FormGroup {
    return this.form().get('address') as FormGroup;
  }
  get contactFormGroup(): FormGroup {
    return this.form().get('contact') as FormGroup;
  }
  get configurationFormGroup(): FormGroup {
    return this.form().get('configuration') as FormGroup;
  }

  form = input.required<FormGroup>();

  changeIsActive(state: boolean): void {
    this.isActiveControl.patchValue(state);
  }
}
