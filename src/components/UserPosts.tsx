import { Row, Col, Card, Typography, Modal, Form, Input, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UserDetails from './UserDetails';
import { useGetUserPostsQuery } from '../store/api/usersApi';
import ReusableTable from './ReusableTable';
import { getUserPostsColumns, type EditablePost } from './columns/userPostsColumns';
import { usePostModal } from '../hooks/posts';
import { useUserData } from '../hooks/users';

const { Title } = Typography;
const { TextArea } = Input;

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: posts = [], isLoading: isLoadingPosts } = useGetUserPostsQuery(Number(userId));
  
  const { user, handleSaveUser } = useUserData();
  const {
    editingPost,
    isModalVisible,
    handleEditPost,
    showDeleteConfirm,
    handleModalOk,
    handleModalCancel,
    setEditingPost
  } = usePostModal();

  const columns = getUserPostsColumns({
    onEdit: handleEditPost,
    onDelete: showDeleteConfirm,
  });

  if (!user) {
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Typography.Text type="danger">User not found</Typography.Text>
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
              title: <Link to="/">Users</Link>
            },
            {
              title: user?.name
            }
          ]}
        />
        <Card style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ marginBottom: '24px', fontSize: '24px' }}>User Details</Title>
          <UserDetails
            user={user}
            onSave={handleSaveUser}
            onCancel={() => {}}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Card style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ marginBottom: '24px', fontSize: '24px' }}>User Posts</Title>
          <ReusableTable<EditablePost>
            rowKey="id"
            dataSource={posts}
            columns={columns}
            pagination={false}
            loading={isLoadingPosts}
            scroll={{ x: 'max-content' }}
            size="small"
          />
        </Card>
      </Col>
      <Modal
        title="Edit Post"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width="90%"
        style={{ maxWidth: '600px' }}
        destroyOnHidden
      >
        {editingPost && (
          <Form layout="vertical">
            <Form.Item label="Title">
              <Input
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Body">
              <TextArea
                value={editingPost.body}
                onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                rows={4}
                style={{ resize: 'vertical' }}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Row>
  );
};

export default UserPosts; 