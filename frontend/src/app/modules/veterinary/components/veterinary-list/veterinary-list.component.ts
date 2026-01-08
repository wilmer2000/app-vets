import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '../../../../shared/components/container/container.component';

@Component({
  selector: 'app-veterinary-list',
  imports: [ContainerComponent],
  templateUrl: './veterinary-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VeterinaryListComponent {}
