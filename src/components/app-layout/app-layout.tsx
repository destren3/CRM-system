import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import {
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './app-layout.module.scss';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/slices/user-slice';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch: AppDispatch = useDispatch();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

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
