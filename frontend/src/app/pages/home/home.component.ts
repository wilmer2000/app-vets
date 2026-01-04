import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `
})
export class HomeComponent {}
