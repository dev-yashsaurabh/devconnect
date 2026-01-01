// profile.model.ts
export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  profilePic: string;
  skills: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}
