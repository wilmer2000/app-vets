import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet],
  template: `
    <h1>Admin</h1>
    <router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {}
