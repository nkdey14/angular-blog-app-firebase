import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);

  isDarkMode = false;

  constructor() {
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    this.isDarkMode = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');

    this.applyTheme();
  }

  private applyTheme(): void {
    this.document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}
