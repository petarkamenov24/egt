import { Row, Col, Card, Button, Typography, Spin, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import UserDetails from './UserDetails';
import type { User } from '../types/api';
import ReusableTable from './ReusableTable';
import { useGetUsersQuery, useUpdateUserMutation } from '../store/api/usersApi';
import { FileTextOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UsersList = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const handleSaveUser = useCallback((updatedUser: User) => {
    updateUser(updatedUser);
  }, [updateUser]);

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }
  ], []);

  const expandedRowRender = useCallback((record: User) => (
    <>
      <UserDetails
        user={record}
        onSave={handleSaveUser}
        onCancel={() => {}}
      />
      <Button 
        type="primary"
        icon={<FileTextOutlined />}
        onClick={() => navigate(`/user/${record.id}/posts`)}
        size="large"
      >
        View Posts
      </Button>
    </>
  ), [handleSaveUser, navigate]);

  if (isLoading) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  if (error) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Typography.Text type="danger">
            {error instanceof Error ? error.message : 'An error occurred'}
          </Typography.Text>
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: '16px' }}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Breadcrumb 
          style={{ marginBottom: '16px' }}
          items={[
            {
              title: 'Users'
            }
          ]}
        />
        <Card style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ marginBottom: '24px', fontSize: '24px' }}>Users</Title>
          <ReusableTable<User>
            rowKey="id"
            dataSource={users}
            columns={columns}
            expandable={{
              expandedRowRender,
              expandRowByClick: true,
            }}
            pagination={false}
            loading={isLoading}
            scroll={{ x: 'max-content' }}
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default UsersList; 