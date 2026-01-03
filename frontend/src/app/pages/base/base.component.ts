import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet],
  templateUrl: './base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `
})
export class BaseComponent {}
