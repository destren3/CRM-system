import { useEffect, useState } from 'react';
import { getUserProfile } from '../../api/services';
import { Profile } from '../../lib/types';
import { Card, Descriptions } from 'antd';
import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<Profile | null>(null);

  const fetchUserInfo = async () => {
    const userInfo = await getUserProfile();
    setUserInfo(userInfo);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Card title="Профиль пользователя" className={styles.card}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Почта">
          {userInfo?.email || 'Нет данных'}
        </Descriptions.Item>
        <Descriptions.Item label="Телефон">
          {userInfo?.phoneNumber || 'Нет данных'}
        </Descriptions.Item>
        <Descriptions.Item label="Имя">
          {userInfo?.username || 'Нет данных'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
