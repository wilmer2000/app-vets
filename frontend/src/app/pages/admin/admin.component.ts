import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet],
  template: `<div class="p-4"><router-outlet /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {}
