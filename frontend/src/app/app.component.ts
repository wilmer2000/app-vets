import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
      <div class="flex justify-center items-center h-lvh w-lvw">
          
          <div> 
              <h1>Welcome to {{ title() }}!</h1>
              <input class="form-input">
              <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox" />
                  <span class="ml-2">Check this box</span>
              </label>
              <router-outlet />
          </div>
          
      </div>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('vet-app');
}
