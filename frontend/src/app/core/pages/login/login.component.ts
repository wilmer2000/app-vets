import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../modules/auth/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
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

  form = new FormGroup({
    email: new FormControl('email', [Validators.required, Validators.email]),
    password: new FormControl('password', [Validators.required])
  });

  login(): void {
    if (!this.form.valid) return;

    const email = this.form.value.email as string;
    const password = this.form.value.password as string;

    this.authService.login(email, password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
