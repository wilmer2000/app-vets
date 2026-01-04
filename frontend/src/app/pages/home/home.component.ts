import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
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
