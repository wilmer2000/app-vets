import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { InputFormComponent } from '../../core/form/input-form/input-form.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, InputFormComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  form = signal(
    new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
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

    const email = this.form().value.email as string;
    const password = this.form().value.password as string;

    this.authService
      .login(email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigateByUrl('/home'));
  }
}
