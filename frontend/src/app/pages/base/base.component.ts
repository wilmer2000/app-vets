import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet, NavbarComponent, HeaderComponent],
  templateUrl: './base.component.html',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent {}
