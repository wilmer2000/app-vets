import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { icons, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-icon',
  imports: [LucideAngularModule],
  template: `<i-lucide
    [name]="iconRef()"
    [size]="size()"
    [class]="classes()"
    [strokeWidth]="stroke()"
    [absoluteStrokeWidth]="true"
    class="icon text-({{ color() }})"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      width: auto;
      height: auto;
      line-height: 1;
    }
  `,
})
export class IconComponent {
  protected iconRef = computed(() => (icons as any)[this.icon()] || icons.Smile);
  icon = input.required<string>();
  classes = input<string>('');
  color = input<string>('');
  stroke = input<number>(2);
  size = input<number>(24);
}
