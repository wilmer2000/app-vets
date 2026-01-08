import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from '../../../../shared/components/container/container.component';

@Component({
  selector: 'app-veterinary-base',
  imports: [RouterOutlet, ContainerComponent],
  templateUrl: './veterinary-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VeterinaryBaseComponent {}
