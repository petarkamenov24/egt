import type { Post, User } from './api';
import type { Task } from './components';

export interface TodoState {
  todos: Task[];
  loading: boolean;
  error: string | null;
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
} 