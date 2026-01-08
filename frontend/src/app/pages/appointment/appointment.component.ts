import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-appointment',
  imports: [RouterOutlet],
  templateUrl: './appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentComponent {}
