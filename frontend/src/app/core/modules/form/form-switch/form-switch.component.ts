import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-switch',
  templateUrl: './form-switch.component.html',
  styles: [
    `
      :host {
        display: block;
        min-width: 52px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSwitchComponent {
  status = input.required<boolean>();
  label = input<string>('');
  disabled = input<boolean>(false);
  statusEmitter = output<boolean>();

  toggleStatus(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled()) {
      this.statusEmitter.emit(!this.status());
    }
  }
}
