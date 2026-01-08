import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '../../../../shared/components/container/container.component';

@Component({
  selector: 'app-users-list',
  imports: [ContainerComponent],
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {}
