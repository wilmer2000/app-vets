import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-services-list',
  imports: [],
  templateUrl: './services-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesListComponent {
  services = signal<any[]>([]);
}
