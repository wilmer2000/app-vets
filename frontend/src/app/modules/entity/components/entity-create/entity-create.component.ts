import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ENTITY_FORM_CONSTANT } from '../../constants/form.constant';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entity-create',
  imports: [IconComponent, EntityFormComponent, RouterLink],
  templateUrl: './entity-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityCreateComponent {
  form = signal(ENTITY_FORM_CONSTANT());
}
