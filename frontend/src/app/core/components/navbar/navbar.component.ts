import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, NavbarItemComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
