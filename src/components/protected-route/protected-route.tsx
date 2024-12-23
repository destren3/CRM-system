import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './protected-route.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/slices/user-slice';
import { AppDispatch, RootState } from '../../store/store';
import { Spin } from 'antd';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.loading);

  if (!user) {
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    dispatch(fetchUser());
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
