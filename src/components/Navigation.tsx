import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, CheckSquareOutlined } from '@ant-design/icons';

const Navigation = () => {
  const location = useLocation();
  
  const items = [
    {
      key: '/',
      label: (
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HomeOutlined />
          Home
        </Link>
      ),
    },
    {
      key: '/tasks',
      label: (
        <Link to="/tasks" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckSquareOutlined />
          Tasks
        </Link>
      ),
    },
  ];

  return (
    <Menu
      theme="light"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
      style={{
        display: 'flex',
        justifyContent: 'center',
        fontSize: '16px',
      }}
    />
  );
};

export default Navigation; 