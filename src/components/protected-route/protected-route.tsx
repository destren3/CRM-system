import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../api/services';
import { useNavigate } from 'react-router-dom';
import styles from './protected-route.module.scss';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const user = await getUserProfile();

      if (!user) {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.log(error);
      navigate('/login', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return <>{children}</>;
};
