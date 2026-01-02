import { Injectable, signal } from '@angular/core';
import { Project } from './feed.model';
import { FEED_MOCK } from './feed.mock';
import { delay } from 'rxjs';
import { of } from 'rxjs';
import { Comment } from './feed.model';

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

  const start = (this.page() - 1) * this.limit;
  const end = start + this.limit;
  const data = FEED_MOCK.slice(start, end);

  // Simulate API call
  of({ data, hasMore: end < FEED_MOCK.length })
    .pipe(delay(500)) // simulate network delay
    .subscribe(res => {
      // Ensure each project has a comments array
      const projectsWithComments = res.data.map(p => ({ ...p, comments: p.comments || [] }));

      // Add loaded projects to the signal
      this.projects.update(p => [...p, ...projectsWithComments]);

      // Update pagination & loading state
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

  addComment(projectId: number, text: string, author: string = 'Current User') {
  if (!text.trim()) return;

  const newComment: Comment = {
    id: Date.now(), // simple unique id
    author,
    text,
    createdAt: new Date(),
  };

  this.projects.update(projects =>
    projects.map(p =>
      p.id === projectId
        ? { ...p, comments: [...(p.comments || []), newComment] }
        : p
    )
  );
}

}
