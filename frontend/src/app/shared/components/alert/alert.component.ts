import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  data = inject(DIALOG_DATA);
}
