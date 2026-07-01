import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  
  // Create a signal to track dark mode state
  readonly isDark = signal<boolean>(false);

  constructor() {
    // Only run theme check in the browser to support SSR safety
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
      this.isDark.set(shouldBeDark);
      
      // Update HTML class reactively when the signal changes
      effect(() => {
        const dark = this.isDark();
        if (dark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  }

  toggle(): void {
    this.isDark.update(dark => !dark);
  }
}
