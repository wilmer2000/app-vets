import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  imports: [IconComponent, RouterLink],
  templateUrl: './user-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {}
