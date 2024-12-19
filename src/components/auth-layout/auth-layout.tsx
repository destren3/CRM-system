import { Layout, Card } from 'antd';
import styles from './auth-layout.module.scss';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

interface AuthLayoutProps {
  images: string[];
}

export const AuthLayout = ({ images }: AuthLayoutProps) => {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <Layout className={styles.layout}>
      <img src={randomImage} className={styles.image} />

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
