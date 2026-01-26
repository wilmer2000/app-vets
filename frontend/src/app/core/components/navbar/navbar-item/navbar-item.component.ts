import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class NavbarItemComponent {
  icon = input.required<string>();
  label = input.required<string>();
}
