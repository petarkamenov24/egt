import type { TableProps } from 'antd';
import type { Post, User } from './api';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export interface EditablePost extends Post {}

export interface ReusableTableProps<T> extends Omit<TableProps<T>, 'columns' | 'expandable'> {
  columns: TableProps<T>['columns'];
  expandable?: TableProps<T>['expandable'];
}

export interface TaskFiltersProps {
  onFilterChange: (filters: {
    status?: boolean;
    title?: string;
    userId?: number;
  }) => void;
}

export interface UserDetailsProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

export interface UserPostsColumnsProps {
  onEdit: (post: EditablePost) => void;
  onDelete: (post: EditablePost) => void;
} 