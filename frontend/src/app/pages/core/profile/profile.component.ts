import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '../../../shared/components/container/container.component';


@Component({
  selector: 'app-profile',
  imports: [ContainerComponent],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {}
