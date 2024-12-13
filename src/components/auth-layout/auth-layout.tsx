import { Layout, Card, Typography } from 'antd';
import React from 'react';
import styles from './auth-layout.module.scss';

const { Content } = Layout;
const { Title } = Typography;

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  image: string;
}

export const AuthLayout = ({ children, title, image }: AuthLayoutProps) => {
  return (
    <Layout className={styles.layout}>
      <img src={image} className={styles.image} />

      <Content className={styles.content}>
        <Card bordered className={styles.card}>
          <Title level={4} className={styles.title}>
            {title}
          </Title>
          <div className={styles['content-container']}>{children}</div>
        </Card>
      </Content>
    </Layout>
  );
};
