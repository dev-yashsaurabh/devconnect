import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/components/sidebar';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  template: `
    <header class="app-header">
        <h1>Dev Connect</h1>
    </header>

    <div class="app-layout">
      <app-sidebar></app-sidebar>

      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './private-layout.scss',
})
export class PrivateLayoutComponent {}
