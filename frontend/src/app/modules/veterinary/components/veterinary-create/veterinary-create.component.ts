import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '../../../../shared/components/container/container.component';

@Component({
  selector: 'app-veterinary-create',
  imports: [ContainerComponent],
  templateUrl: './veterinary-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VeterinaryCreateComponent {}
