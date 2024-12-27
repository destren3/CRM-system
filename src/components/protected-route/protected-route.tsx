import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './protected-route.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Spin } from 'antd';
import { getCurrentUserProfile } from '../../api/services';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.loading);

  const fetchUserInfo = async () => {
    try {
      await getCurrentUserProfile();
    } catch (error) {
      console.log(error);
      navigate('/login', { replace: true });
    } finally {
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return <Spin size="large" className={styles.loading} />;
  }

  if (location.pathname === '/administration' && !user?.isAdmin) {
    return (
      <div className={styles.accessDeniedMessage}>
        Недостаточно прав для доступа к данной странице
      </div>
    );
  }

  return <>{children}</>;
};
