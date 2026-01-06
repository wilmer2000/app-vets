import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  template: `
    <div class="w-full h-full flex justify-center items-center">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
  `,
  styles: ``
})
export class LoaderComponent {}
