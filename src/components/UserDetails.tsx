import { Form, Input, Button, Space, Row, Col, Typography, Card } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import type { User } from '../types/api';
import { 
  EditOutlined, 
  SaveOutlined, 
  CloseOutlined,
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  NumberOutlined,
  IdcardOutlined
} from '@ant-design/icons';

const { Text } = Typography;

interface UserDetailsProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const UserDetails = React.memo(({ user, onSave, onCancel }: UserDetailsProps) => {
  const [form] = Form.useForm();
  const [hasChanges, setHasChanges] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const resetFormWithStoreData = useCallback(() => {
    form.setFieldsValue({
      ...user,
      address: user.address
    });
    setHasChanges(false);
    setIsEditing(false);
  }, [form, user]);

  useEffect(() => {
    resetFormWithStoreData();
  }, [user, form, resetFormWithStoreData]);

  const handleValuesChange = useCallback(() => {
    const currentValues = form.getFieldsValue();
    const hasFormChanges = Object.keys(currentValues).some(key => {
      if (key === 'address') {
        return Object.keys(currentValues.address).some(addrKey => 
          currentValues.address[addrKey] !== user.address[addrKey as keyof typeof user.address]
        );
      }
      return currentValues[key] !== user[key as keyof User];
    });
    setHasChanges(hasFormChanges);
  }, [form, user]);

  const handleSubmit = useCallback((values: any) => {
    onSave({ ...user, ...values });
    setHasChanges(false);
    setIsEditing(false);
  }, [onSave, user]);

  const handleCancel = useCallback(() => {
    resetFormWithStoreData();
    onCancel();
  }, [resetFormWithStoreData, onCancel]);

  const renderField = (label: string, value: string, icon: React.ReactNode) => (
    <div style={{ marginBottom: '16px' }}>
      <Space>
        {icon}
        <Text type="secondary" style={{ fontSize: '12px' }}>{label}:</Text>
        <span style={{ fontSize: '12px', fontWeight: 500 }}>{value}</span>
      </Space>
    </div>
  );

  return (
    <Card
      style={{ marginBottom: 16 }}
      actions={[
        !isEditing ? (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
            key="edit"
          >
            Edit
          </Button>
        ) : (
          <Space>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => form.submit()}
              disabled={!hasChanges || hasErrors}
              key="save"
            >
              Save
            </Button>
            <Button
              icon={<CloseOutlined />}
              onClick={handleCancel}
              key="cancel"
            >
              Cancel
            </Button>
          </Space>
        )
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        onFinish={handleSubmit}
        onFieldsChange={() => {
          const errors = form.getFieldsError();
          setHasErrors(errors.some(field => field.errors.length > 0));
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8}>
            {isEditing ? (
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            ) : (
              renderField('Name', user.name, <UserOutlined />)
            )}
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            {isEditing ? (
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input prefix={<IdcardOutlined />} />
              </Form.Item>
            ) : (
              renderField('Username', user.username, <IdcardOutlined />)
            )}
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            {isEditing ? (
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
            ) : (
              renderField('Email', user.email, <MailOutlined />)
            )}
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8}>
            {isEditing ? (
              <Form.Item
                name={['address', 'street']}
                label="Street"
                rules={[{ required: true, message: 'Please input your street!' }]}
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>
            ) : (
              renderField('Street', user.address.street, <HomeOutlined />)
            )}
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            {isEditing ? (
              <Form.Item
                name={['address', 'suite']}
                label="Suite"
                rules={[{ required: true, message: 'Please input your suite!' }]}
              >
                <Input prefix={<HomeOutlined />} />
              </Form.Item>
            ) : (
              renderField('Suite', user.address.suite, <HomeOutlined />)
            )}
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            {isEditing ? (
              <Form.Item
                name={['address', 'city']}
                label="City"
                rules={[{ required: true, message: 'Please input your city!' }]}
              >
                <Input prefix={<EnvironmentOutlined />} />
              </Form.Item>
            ) : (
              renderField('City', user.address.city, <EnvironmentOutlined />)
            )}
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8}>
            {isEditing ? (
              <Form.Item
                name={['address', 'zipcode']}
                label="Zipcode"
                rules={[{ required: true, message: 'Please input your zipcode!' }]}
              >
                <Input prefix={<NumberOutlined />} />
              </Form.Item>
            ) : (
              renderField('Zipcode', user.address.zipcode, <NumberOutlined />)
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
});

UserDetails.displayName = 'UserDetails';

export default UserDetails; 