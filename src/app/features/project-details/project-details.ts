import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FeedService } from '../feed/feed.service';
import { signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-project-details',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './project-details.html',
  styleUrls: ['./project-details.scss'],
})
export class ProjectDetails {
  private feed = inject(FeedService);
  project = signal(this.feed.projects().length ? this.feed.projects()[0] : null);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.feed.projects().find(p => p.id === id) ?? null;

    if (!found) this.router.navigate(['/feed']); // fallback
    this.project.set(found);
  }

  toggleLike() {
    const p = this.project();
    if (!p) return;
    this.feed.like(p.id);
  }
}
