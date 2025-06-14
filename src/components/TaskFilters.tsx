import { Card, Form, Input, Select, Row, Col } from 'antd';
import { useGetUsersQuery } from '../store/api/usersApi';
import { useCallback, useMemo } from 'react';
import React from 'react';

interface TaskFiltersProps {
  onFilterChange: (filters: {
    status?: boolean;
    title?: string;
    userId?: number;
  }) => void;
}

const TaskFilters = React.memo(({ onFilterChange }: TaskFiltersProps) => {
  const { data: users } = useGetUsersQuery();

  const userOptions = useMemo(() => 
    users?.map(user => ({
      label: user.name,
      value: user.id,
    })), [users]);

  const handleValuesChange = useCallback((_: any, allValues: any) => {
    onFilterChange(allValues);
  }, [onFilterChange]);

  return (
    <Card style={{ marginBottom: 16 }}>
      <Form
        layout="vertical"
        onValuesChange={handleValuesChange}
        initialValues={{}}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item name="status" label="Status">
              <Select
                id="task-status-filter"
                allowClear
                placeholder="Filter by status"
                options={[
                  { label: 'Completed', value: true },
                  { label: 'Not Completed', value: false },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item name="title" label="Title">
              <Input
                id="task-title-filter"
                placeholder="Search by title"
                allowClear
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item name="userId" label="Owner">
              <Select
                id="task-owner-filter"
                allowClear
                placeholder="Filter by owner"
                options={userOptions}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
});

TaskFilters.displayName = 'TaskFilters';

export default TaskFilters; 