import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { icons, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-icon',
  imports: [LucideAngularModule],
  template: `<i-lucide [name]="iconRef()" [class]="classes()" class="icon block mx-auto" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  protected iconRef = computed(() => (icons as any)[this.icon()] || icons.Smile);
  icon = input.required<string>();
  classes = input<string>('');
}
