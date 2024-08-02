import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChildren } from '@angular/core';
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
  constructor() {
    // Define custom elements from the Astral UI library
    defineCustomElements(window);
  }

  ngAfterViewInit() {
    // Find the toggle theme button and its children
    const toggleThemeButton = document.body.querySelector('#toggle-theme-button') as HTMLElement;
    const icon = toggleThemeButton?.querySelector('i');
    const buttonText = toggleThemeButton?.querySelector('#toggle-theme-button-text') as HTMLElement;

    // Function to check if the current theme is dark
    const isDarkTheme = () => document.documentElement.getAttribute('data-theme') === 'dark';

    // If all elements are present, add event listeners and update the UI
    if (toggleThemeButton && icon && buttonText) {
      // Update the button icon and text based on the current theme
      const updateThemeUI = () => {
        if (isDarkTheme()) {
          icon.innerText = 'light_mode';
          buttonText.innerText = 'Toggle light mode';
        } else {
          icon.innerText = 'dark_mode';
          buttonText.innerText = 'Toggle dark mode';
        }
      };

      // Initial UI update based on the current theme
      updateThemeUI();

      // Add event listener to toggle the theme on button click
      toggleThemeButton.addEventListener('click', () => {
        if (isDarkTheme()) {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
        updateThemeUI();
      });
    }

    // Set the initial theme based on the user's system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Listen for changes in the user's system theme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (event.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });
  }
}
