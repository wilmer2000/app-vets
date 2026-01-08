import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '../../../../shared/components/container/container.component';

@Component({
  selector: 'app-veterinary-edit',
  imports: [ContainerComponent],
  templateUrl: './veterinary-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VeterinaryEditComponent {}
