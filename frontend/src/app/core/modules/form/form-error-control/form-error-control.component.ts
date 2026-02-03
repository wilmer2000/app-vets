import { Component, input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error-control',
  templateUrl: './form-error-control.component.html'
})
export class FormErrorControlComponent {
  form = input.required<FormGroup>();
  field = input.required<string>();

  get getField(): AbstractControl<unknown, unknown> | null {
    return this.form().get(this.field());
  }
}
