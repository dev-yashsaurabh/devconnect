import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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

  projects = this.feed.projects;
  loading = this.feed.loading;
  skeletons = Array.from({ length: 6 });

  ngOnInit() {
    this.feed.loadFeed();
  }

  toggleLike(id: number) {
    this.feed.like(id);
  }
}
