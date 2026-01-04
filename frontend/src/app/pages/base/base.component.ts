import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet, HeaderComponent, NavbarComponent],
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
