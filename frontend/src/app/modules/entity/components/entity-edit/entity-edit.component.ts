import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-entity-edit',
  imports: [],
  template: ` <p>entity-edit works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityEditComponent {}
