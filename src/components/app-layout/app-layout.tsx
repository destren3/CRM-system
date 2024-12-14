import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './app-layout.module.scss';
import { useState } from 'react';
import { logoutUser } from '../../api/services';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch {
      console.log('govno');
    }
  };

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
            onClick={(e) => handleMenuClick(e.key)}
          >
            <Menu.Item key="/" icon={<FileTextOutlined />}>
              Заметки
            </Menu.Item>
            <Menu.Item key="/profile" icon={<UserOutlined />}>
              Профиль
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} onClick={handleLogoutClick}>
              Выход
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
