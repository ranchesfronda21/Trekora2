export interface User {
  id: string;
  name: string;
  photo: string;
  email: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: number;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  createdAt: string;
  comments: Comment[];
}
