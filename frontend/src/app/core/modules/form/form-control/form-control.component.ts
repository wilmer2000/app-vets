import { Component, DestroyRef, forwardRef, inject, input, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormSelectOpts, FormType } from '../form.interface';
import { distinctUntilChanged } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  imports: [ReactiveFormsModule, DatePipe],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
  ],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FormControlComponent implements OnInit, ControlValueAccessor {
  form = input.required<FormGroup>();
  controlName = input.required<string>();
  label = input<string>();
  type = input<FormType>('input');
  options = input<FormSelectOpts[]>();
  defaultValue = input<any>();
  minDate = input<Date | undefined>();
  maxDate = input<Date | undefined>();
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  valueChanged = output<any>();
  actionCheckbox = output<any>();

  private control: AbstractControl;
  private isSettingValue = false;
  private destroyRef = inject(DestroyRef);

  get controlAbs(): AbstractControl {
    return this.form().controls[this.controlName()] as AbstractControl;
  }

  onChange: any = (): void => {
    // Keep
  };
  onTouch: any = (): void => {
    // Keep
  };

  ngOnInit(): void {
    const control = this.form().controls[this.controlName()];

    if (!control) {
      return;
    }

    this.control = control as AbstractControl;
    this.control.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.onChange(value);
        this.onTouch(value);
        this.valueChanged.emit(value);
      });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    // TODO: Improve this
    if (!this.isSettingValue) {
      this.isSettingValue = true;
      this.control.setValue(value, { emitEvent: false });
      this.isSettingValue = false;
    }
  }

  toggleStatus(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.control.setValue(!this.control.value);
  }
}
