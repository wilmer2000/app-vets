import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from '../../shared/components/container/container.component';

@Component({
  selector: 'app-pet',
  imports: [RouterOutlet, ContainerComponent],
  templateUrl: './pet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetComponent {}
