import { Button, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';

export interface EditablePost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface UserPostsColumnsProps {
  onEdit: (post: EditablePost) => void;
  onDelete: (post: EditablePost) => void;
}

export const getUserPostsColumns = ({ onEdit, onDelete }: UserPostsColumnsProps): ColumnsType<EditablePost> => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
  },
  {
    title: 'Actions',
    key: 'actions',
    align: 'right',
    render: (_: any, record: EditablePost) => (
      <Dropdown
        menu={{
          items: [
            {
              key: 'edit',
              label: 'Edit',
              onClick: () => onEdit(record),
            },
            {
              key: 'delete',
              label: 'Delete',
              danger: true,
              onClick: () => onDelete(record),
            },
          ],
        }}
        trigger={['click']}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    ellipsis: true,
  },
]; 