import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';

@Component({
  selector: 'app-user',
  imports: [ContainerComponent],
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {}
