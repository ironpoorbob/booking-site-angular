import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';

@Component({
  selector: 'app-root',
  imports: [AuthHeaderComponent, SubNavComponent, RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  private readonly router = inject(Router);

  protected get showAuthHeader(): boolean {
    const currentPath = this.router.url.split('?')[0];
    return currentPath !== '/dashboard' &&
      currentPath !== '/search' &&
      currentPath !== '/profile-edit' &&
      currentPath !== '/';
  }

  protected get showSubNav(): boolean {
    const currentPath = this.router.url.split('?')[0];
    return currentPath !== '/login' &&
      currentPath !== '/signup' &&
      currentPath !== '/signed-out' &&
      currentPath !== '/';
  }
}
