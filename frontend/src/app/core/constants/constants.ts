import { ChangeDetectionStrategy } from '@angular/core';

export const COMPONENT_DEFAULT_CONFIG = () => ({
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
});
