import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/modules/auth/services/auth.service';
import { FormControlComponent } from '../../core/modules/form/form-control/form-control.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, FormControlComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  form = signal(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }),
  );

  get emailControl(): FormControl {
    return this.form().controls.email;
  }
  get passwordControl(): FormControl {
    return this.form().controls.password;
  }

  login(): void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    const email = this.emailControl.value;
    const password = this.passwordControl.value;

    this.authService.login(email, password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
