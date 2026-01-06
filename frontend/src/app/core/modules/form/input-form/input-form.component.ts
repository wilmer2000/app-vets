import { Component, forwardRef, input, OnInit, output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { SelectOption } from '../interfaces/form.interface';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  imports: [ReactiveFormsModule, FormErrorsComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true
    }
  ]
})
export class InputFormComponent implements OnInit, ControlValueAccessor {
  form = input<FormGroup>(new FormGroup({}));
  controlName = input('');
  label = input<string | null>(null);
  pattern = input<string | null>(null);
  size = input<string | null>(null);
  maxLength = input<number | null>(null);
  minLength = input<number | null>(null);
  placeholder = input('');
  errors = input<Record<string, string>>({});
  type = input<'text' | 'email' | 'tel' | 'date' | 'password' | 'select'>('text');
  options = input<SelectOption[]>([]);
  defaultValue = input<any | null>(null);
  valueChanged = output<any>();

  get control(): FormControl {
    return this.form().get(this.controlName()) as FormControl;
  }

  private isSettingValue = false;

  onChange: any = (): void => {
    // Keep
  };
  onTouch: any = (): void => {
    // Keep
  };

  ngOnInit(): void {
    if (this.control) {
      this.control.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
        this.onChange(value);
        this.onTouch(value);
        this.valueChanged.emit(value);
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    if (!this.isSettingValue) {
      this.isSettingValue = true;
      this.control.setValue(value, { emitEvent: false });
      this.isSettingValue = false;
    }
  }
}
