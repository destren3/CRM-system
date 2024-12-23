import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './app-layout.module.scss';
import { useState } from 'react';
import { logoutUser } from '../../api/services';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      handleLogoutClick();
    } else {
      navigate(key);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      key: '/',
      icon: <FileTextOutlined />,
      label: 'Заметки',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Профиль',
    },
    ...(user?.isAdmin
      ? [
          {
            key: '/administration',
            icon: <SettingOutlined />,
            label: 'Пользователи',
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выход',
    },
  ];

  return (
    <Layout>
      <Layout className={styles['pages-wrapper']}>
        <Sider
          className={styles.sider}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Menu
            className={styles.menu}
            mode="inline"
            defaultSelectedKeys={['/']}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
