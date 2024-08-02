import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { defineCustomElements } from '@techfever/astral-ui/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'astral-ui-test';

  constructor() {
    defineCustomElements(window)
  }
}
