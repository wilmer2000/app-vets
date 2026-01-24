import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { COMPONENT_DEFAULT_CONFIG } from './core/constants/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  ...COMPONENT_DEFAULT_CONFIG(),
})
export class App {}
