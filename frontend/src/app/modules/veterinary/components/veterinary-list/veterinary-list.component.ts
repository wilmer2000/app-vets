import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-veterinary-list',
  imports: [RouterLink],
  templateUrl: './veterinary-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VeterinaryListComponent {}
