// Angular framework imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Third-party libraries
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.scss'
})
export class App {
  constructor() {
    Chart.register(...registerables);
  }
}
