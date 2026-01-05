import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pet',
  imports: [RouterOutlet],
  templateUrl: './pet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetComponent {}
