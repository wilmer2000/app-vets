import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControlComponent } from '../../../../core/modules/form/form-control/form-control.component';
import { FormSwitchComponent } from '../../../../core/modules/form/form-switch/form-switch.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  imports: [FormControlComponent, FormSwitchComponent],
  templateUrl: './entity-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityFormComponent {
  get isActiveControl(): FormControl {
    return this.form().get('isActive') as FormControl;
  }

  form = input.required<FormGroup>();

  changeIsActive(state: boolean): void {
    this.isActiveControl.patchValue(state);
  }
}
