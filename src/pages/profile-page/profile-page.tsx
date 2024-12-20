import { useEffect, useState } from 'react';
import { getUserProfile } from '../../api/services';
import { Profile } from '../../lib/types';
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
    <div>
      <h1>Ваши данные:</h1>
      <p>
        <span className={styles.highlight}>Почта:</span>{' '}
        {userInfo && userInfo.email}
      </p>
      <p>
        <span className={styles.highlight}>Телефон:</span>{' '}
        {userInfo?.phoneNumber ? userInfo.phoneNumber : 'Нет данных'}
      </p>
      <p>
        <span className={styles.highlight}>Имя:</span>{' '}
        {userInfo && userInfo.username}
      </p>
    </div>
  );
};
