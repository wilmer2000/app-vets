import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet],
  templateUrl: './base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent {}
