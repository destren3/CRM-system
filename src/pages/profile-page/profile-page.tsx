import { useEffect, useState } from 'react';
import { getCurrentUserProfile, logoutUser } from '../../api/services';
import { Profile } from '../../lib/types';
import { Button, Card, Descriptions } from 'antd';
import styles from './profile-page.module.scss';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<Profile | null>(null);
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getCurrentUserProfile();
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Card title={'Мой профиль'} className={styles.card}>
      <Descriptions column={1} bordered className={styles.descriptors}>
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
      <Button onClick={handleLogoutClick} color="danger" variant="solid">
        Выйти из системы
      </Button>
    </Card>
  );
};
