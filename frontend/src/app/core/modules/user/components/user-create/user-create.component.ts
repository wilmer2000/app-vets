import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-create',
  imports: [IconComponent, RouterLink],
  templateUrl: './user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {}
