import { Project } from './feed.model';

export const FEED_MOCK: Project[] = [
  {
    id: 1,
    title: 'DevConnect Platform',
    description: 'A developer networking platform built with Angular & Go.',
    tags: ['Angular', 'Go', 'MongoDB'],
    likes: 12,
    likedByMe: false,
    createdBy: { id: 1, name: 'Yash' },
  },
  {
    id: 2,
    title: 'RxJS Mastery',
    description: 'Hands-on RxJS operators with real use cases.',
    tags: ['RxJS', 'Angular'],
    likes: 8,
    likedByMe: true,
    createdBy: { id: 2, name: 'Aman' },
  },
  {
    id: 3,
    title: 'Auth System',
    description: 'JWT + Microsoft SSO authentication system.',
    tags: ['JWT', 'MSAL', 'Security'],
    likes: 20,
    likedByMe: false,
    createdBy: { id: 3, name: 'Rohit' },
  },
];
