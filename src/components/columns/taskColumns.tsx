import { Checkbox, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { User } from '../../types/api';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export const getTaskColumns = (
  onStatusChange: (taskId: number, completed: boolean) => void
): ColumnsType<Task> => [
  {
    title: '',
    key: 'checkbox',
    render: (_, record) => (
      <Checkbox
        id={`task-completed-${record.id}`}
        checked={record.completed}
        onChange={(e) => onStatusChange(record.id, e.target.checked)}
      />
    ),
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    ellipsis: true,
  },
  {
    title: 'Task Name',
    dataIndex: 'title',
    key: 'title',
    render: (text: string) => <span>{text}</span>,
    ellipsis: true,
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
  },
  {
    title: 'Owner',
    dataIndex: 'user',
    key: 'owner',
    render: (user?: User) => (
      <span>{user?.name}</span>
    ),
    ellipsis: true,
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
  },
  {
    title: 'Status',
    dataIndex: 'completed',
    key: 'status',
    render: (completed: boolean) => (
      <Tag color={completed ? 'success' : 'warning'}>
        {completed ? 'Completed' : 'Not Completed'}
      </Tag>
    ),
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    ellipsis: true,
  },
]; 