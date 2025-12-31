export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  likedByMe: boolean;
  createdBy: {
    id: number;
    name: string;
  };
}
