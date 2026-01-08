import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-veterinary-form',
  imports: [],
  templateUrl: './veterinary-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VeterinaryFormComponent {
  form = signal(new FormGroup({}));
}
