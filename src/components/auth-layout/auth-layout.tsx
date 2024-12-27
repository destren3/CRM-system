import { Layout, Card } from 'antd';
import styles from './auth-layout.module.scss';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRandomImage } from '../../lib/utils';

const { Content } = Layout;

const IMAGE_CHANGE_INTERVAL = 5000;

interface AuthLayoutProps {
  images: string[];
}

export const AuthLayout = ({ images }: AuthLayoutProps) => {
  const [currentImage, setIsCurrentImage] = useState<string>(() =>
    getRandomImage(images)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCurrentImage(getRandomImage(images));
    }, IMAGE_CHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout className={styles.layout}>
      <img src={currentImage} className={styles.image} alt="Random Image" />

      <Content className={styles.content}>
        <Card bordered className={styles.card}>
          <div className={styles['content-container']}>
            <Outlet />
          </div>
        </Card>
      </Content>
    </Layout>
  );
};
