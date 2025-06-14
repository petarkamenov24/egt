import { Row, Col, Card, Typography, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useMemo, useCallback } from 'react';
import TaskFilters from './TaskFilters';
import ReusableTable from './ReusableTable';
import { getTaskColumns, type Task } from './columns/taskColumns';
import { useGetTasksQuery, useUpdateTaskMutation, useGetUsersQuery } from '../store/api/usersApi';

const { Title } = Typography;

const Tasks = () => {
  const [filters, setFilters] = useState<{
    status?: boolean;
    title?: string;
    userId?: number;
  }>({});

  const { data: tasks = [], isLoading: isTasksLoading } = useGetTasksQuery();
  const { data: users = [], isLoading: isUsersLoading } = useGetUsersQuery();
  const [updateTask] = useUpdateTaskMutation();

  const handleStatusChange = useCallback((taskId: number, completed: boolean) => {
    updateTask({ id: taskId, completed });
  }, [updateTask]);

  const tasksWithUsers = useMemo(() => {
    return tasks.map(task => ({
      ...task,
      user: users.find(user => user.id === task.userId)
    }));
  }, [tasks, users]);

  const filteredTasks = useMemo(() => {
    return tasksWithUsers.filter((task) => {
      if (filters.status !== undefined && task.completed !== filters.status) {
        return false;
      }
      if (filters.title && !task.title.toLowerCase().includes(filters.title.toLowerCase())) {
        return false;
      }
      if (filters.userId && task.userId !== filters.userId) {
        return false;
      }
      return true;
    });
  }, [tasksWithUsers, filters]);

  const columns = useMemo(() => 
    getTaskColumns(handleStatusChange), [handleStatusChange]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Breadcrumb 
          style={{ marginBottom: '16px' }}
          items={[
            {
              title: <Link to="/">Users</Link>
            },
            {
              title: 'Tasks'
            }
          ]}
        />
        <Card>
          <Title level={2} style={{ marginBottom: '24px', fontSize: '24px' }}>Tasks</Title>
          <TaskFilters onFilterChange={setFilters} />
          <ReusableTable<Task>
            rowKey="id"
            columns={columns}
            dataSource={filteredTasks}
            pagination={{
              showSizeChanger: false,
              responsive: true,
              size: 'small'
            }}
            loading={isTasksLoading || isUsersLoading}
            scroll={{ x: 'max-content' }}
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Tasks; 