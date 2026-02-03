import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ENTITY_FORM_CONSTANT } from '../../constants/form.constant';

@Component({
  selector: 'app-entity-create',
  imports: [],
  templateUrl: './entity-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityCreateComponent {
  form = signal(ENTITY_FORM_CONSTANT());
}
