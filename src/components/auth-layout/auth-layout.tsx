import { Layout, Card } from 'antd';
import styles from './auth-layout.module.scss';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Content } = Layout;

interface AuthLayoutProps {
  images: string[];
}

export const AuthLayout = ({ images }: AuthLayoutProps) => {
  const [currentImage, setIsCurrentImage] = useState<string>(() => {
    return images[Math.floor(Math.random() * images.length)];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCurrentImage(images[Math.floor(Math.random() * images.length)]);
    }, 5000);
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
