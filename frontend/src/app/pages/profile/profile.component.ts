import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { InputFormComponent } from '../../core/modules/form/input-form/input-form.component';
import { UserService } from '../../core/modules/user/services/user.service';
import { Address, UpdateUser, User } from '../../core/modules/user/interfaces/user.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../core/modules/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ContainerComponent, InputFormComponent],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  currentUser = this.userService.currentUser as Signal<User>;
  form = signal(
    new FormGroup({
      name: new FormControl(''),
      lastname: new FormControl(''),
      phone: new FormControl('')
    })
  );
  formAddress = signal(
    new FormGroup({
      street: new FormControl(''),
      city: new FormControl('')
    })
  );
  ngOnInit(): void {
    const { name, lastname, phone } = this.currentUser();
    const { street, city } = this.currentUser().address as Address;

    this.form().patchValue({ name, lastname, phone });
    this.formAddress().patchValue({ street, city });
  }

  save(): void {
    if (this.form().invalid || this.formAddress().invalid) {
      this.form().markAllAsTouched();
      this.formAddress().markAllAsTouched();

      return;
    }

    const userId = this.currentUser().id;
    const { name, lastname, phone } = this.form().value;
    const { street, city } = this.formAddress().value;
    const values = {
      name,
      lastname,
      phone,
      address: { street, city }
    } as UpdateUser;

    this.userService.updateProfile(userId, values).subscribe();
  };
  logout(): void {
    this.authService.logout();
  };
}
