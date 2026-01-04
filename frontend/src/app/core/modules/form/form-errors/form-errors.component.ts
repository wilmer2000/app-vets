import { Component, input, linkedSignal } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html'
})
export class FormErrorsComponent {
  control = input<FormControl>(new FormControl());
  errors = input<Record<string, string>>({});
  errorList = linkedSignal(() => {
    return {
      required: 'Campo obligatorio',
      pattern: 'Formato no valido',
      email: 'Ingresa un correo válido',
      ...this.errors()
    } as Record<string, string>;
  });
}
