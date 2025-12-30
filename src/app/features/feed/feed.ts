import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FeedService } from './feed.service';

@Component({
  standalone: true,
  selector: 'app-feed',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss'],
})
export class Feed implements OnInit {
  private feed = inject(FeedService);

  // Bind directly to service signals
  projects = this.feed.projects;
  loading = this.feed.loading;
  hasMore = this.feed.hasMore;
  skeletons = Array.from({ length: 6 });

  ngOnInit() {
    this.feed.loadMore(); // initial load
  }

  toggleLike(id: number) {
    this.feed.like(id);
  }

  @HostListener('window:scroll')
  onScroll() {
    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (height - position < threshold) {
      this.feed.loadMore(); // service handles pagination
    }
  }

  // Optional: TrackBy for performance
  trackById(_: number, project: any) {
    return project.id;
  }
}
