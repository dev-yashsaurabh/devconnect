import { CommonModule } from '@angular/common';
import { Component, inject, model, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FeedService } from '../feed/feed.service';

@Component({
  standalone: true,
  selector: 'app-project-details',
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule, MatInputModule, RouterModule],
  templateUrl: './project-details.html',
  styleUrls: ['./project-details.scss'],
})
export class ProjectDetails {
  private feed = inject(FeedService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  newCommentText = model('');

  project = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.feed.projects().find(p => p.id === id) ?? null;
  });

  toggleLike() {
    const p = this.project();
    if (!p) return;
    this.feed.like(p.id);
  }

  addComment() {
    const text = this.newCommentText();
    const p = this.project();
    if (!p || !text.trim()) return;

    this.feed.addComment(p.id, text); // update via service
    this.newCommentText.set('');
  }
}
