import {
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

export const commonRoutes: MenuItem[] = [
  {
    key: '/',
    icon: <FileTextOutlined />,
    label: 'Заметки',
  },
  {
    key: '/my-profile',
    icon: <UserOutlined />,
    label: 'Профиль',
  },
];

export const adminRoutes: MenuItem[] = [
  {
    key: '/administration',
    icon: <SettingOutlined />,
    label: 'Пользователи',
  },
];
