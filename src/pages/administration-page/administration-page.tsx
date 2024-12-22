import { Table, TablePaginationConfig, Typography } from 'antd';
import { columns } from './administration-page-constants';
import { useEffect, useState } from 'react';
import { MetaResponseUsers, User } from '../../lib/types';
import { getUsers } from '../../api/services';
import styles from './administration-page.module.scss';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export const AdministrationPage = () => {
  const [users, setUsers] = useState<MetaResponseUsers<User> | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const fetchUsers = async (offset?: number) => {
    try {
      const users = await getUsers({ offset: offset });
      setUsers(users);
    } catch (error) {
      alert(error);
    }
  };

  const handleTablePageChange = async (pagination: TablePaginationConfig) => {
    try {
      if (pagination.current) setCurrentPage(pagination.current);
      await fetchUsers(currentPage);
    } catch (error) {
      alert(error);
    }
  };

  const handleNavigateToUser = (id: number) => {
    navigate(`/profile/${id}`);
  };

  const data = users?.data?.map((user) => ({
    key: user.id,
    Имя: user.username || 'Нет данных',
    Почта: user.email || 'Нет данных',
    'Дата регистрации': user.date || 'Нет данных',
    'Статус блокировки': user.isBlocked ? 'Заблокирован' : 'Не заблокирован',
    Роль: user.isAdmin === true ? 'Admin' : 'User' || 'Нет данных',
    'Номер телефона': user.phoneNumber || 'Нет данных',
  }));

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          Список пользователей
        </Title>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 20,
          total: users?.meta.totalAmount,
          showSizeChanger: false,
          current: currentPage,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              handleNavigateToUser(record.key);
            },
            className: styles.row,
          };
        }}
        onChange={handleTablePageChange}
        bordered
        className={styles.table}
      />
    </div>
  );
};
