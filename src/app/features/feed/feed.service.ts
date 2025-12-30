import { Injectable, signal } from '@angular/core';
import { Project } from './feed.model';
import { FEED_MOCK } from './feed.mock';
import { delay } from 'rxjs';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeedService {
  projects = signal<Project[]>([]);
  loading = signal(false);
  page = signal(1);
  hasMore = signal(true);
  limit = 6; // 6 per page

  loadMore() {
    if (this.loading() || !this.hasMore()) return;

    this.loading.set(true);

    // simulate API call with RxJS of() + delay
    const start = (this.page() - 1) * this.limit;
    const end = start + this.limit;
    const data = FEED_MOCK.slice(start, end);

    of({ data, hasMore: end < FEED_MOCK.length })
      .pipe(delay(500)) // simulate network delay
      .subscribe(res => {
        this.projects.update(p => [...p, ...res.data]);
        this.hasMore.set(res.hasMore);
        this.page.update(p => p + 1);
        this.loading.set(false);
      });
  }

  like(id: number) {
    this.projects.update(projects =>
      projects.map(p =>
        p.id === id
          ? {
              ...p,
              likedByMe: !p.likedByMe,
              likes: p.likes + (p.likedByMe ? -1 : 1),
            }
          : p
      )
    );
  }
}
