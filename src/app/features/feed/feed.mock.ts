import { Project } from './feed.model';

export const FEED_MOCK: Project[] = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  description: `This is a description for project ${i + 1}.`,
  tags: ['Angular', 'RxJS', 'Mock'],
  likes: Math.floor(Math.random() * 20),
  likedByMe: false,
  createdBy: { id: i % 5 + 1, name: `User ${i % 5 + 1}` },
}));
