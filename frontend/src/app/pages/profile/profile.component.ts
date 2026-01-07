import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { InputFormComponent } from '../../core/modules/form/input-form/input-form.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { UserService } from '../../core/modules/user/services/user.service';
import { User } from '../../core/modules/user/interfaces/user.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ContainerComponent, InputFormComponent, LoaderComponent],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private readonly userService = inject(UserService);

  currentUser = this.userService.currentUser as Signal<User>;
  form = signal(
    new FormGroup({
      name: new FormControl(''),
      lastname: new FormControl(''),
      phone: new FormControl(''),
    })
  );
  formAddress = signal(
    new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
    })
  );
}
