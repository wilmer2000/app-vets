import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';

@Component({
  selector: 'app-appointment',
  imports: [ContainerComponent],
  templateUrl: './appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentComponent {}
