import { Injectable, signal } from '@angular/core';
import { Project } from './feed.model';
import { FEED_MOCK } from './feed.mock';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private _projects = signal<Project[]>([]);
  private _loading = signal(false);

  projects = this._projects.asReadonly();
  loading = this._loading.asReadonly();

  loadFeed() {
    this._loading.set(true);

    // simulate API delay
    setTimeout(() => {
      this._projects.set(FEED_MOCK);
      this._loading.set(false);
    }, 800);
  }

  like(projectId: number) {
    this._projects.update(projects =>
      projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
              likedByMe: !p.likedByMe,
            }
          : p
      )
    );
  }
}
