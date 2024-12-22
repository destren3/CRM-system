import { Button, Space, Table, TablePaginationConfig, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { MetaResponseUsers, User } from '../../lib/types';
import { deleteUser, getUsers } from '../../api/services';
import styles from './administration-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const { Title } = Typography;

export const AdministrationPage = () => {
  const [users, setUsers] = useState<MetaResponseUsers<User> | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const handleDeleteUser = async (recordKey: number) => {
    try {
      await deleteUser(recordKey);
      await fetchUsers();
    } catch (error) {
      alert(error);
    }
  };

  const handleOpenConfirmModal = (recordKey: number) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить этого пользователя?',
      content: 'Это действие необратимо.',
      okText: 'Да, удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        handleDeleteUser(recordKey);
      },
      onCancel() {
        console.log('Удаление отменено');
      },
    });
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'Имя',
      key: 'Имя',
    },
    {
      title: 'Почта',
      dataIndex: 'Почта',
      key: 'Почта',
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'Дата регистрации',
      key: 'Дата регистрации',
    },
    {
      title: 'Статус блокировки',
      dataIndex: 'Статус блокировки',
      key: 'Статус блокировки',
    },
    {
      title: 'Роль',
      dataIndex: 'Роль',
      key: 'Роль',
    },
    {
      title: 'Номер телефона',
      dataIndex: 'Номер телефона',
      key: 'Номер телефона',
    },
    {
      title: 'Действия',
      dataIndex: 'Действия',
      key: 'Действия',
      render: (_: string, record: { key: number }) => (
        <Space>
          <Button
            variant="solid"
            color="primary"
            onClick={() => handleNavigateToUser(record.key)}
          >
            Профиль
          </Button>
          <Button
            variant="solid"
            color="danger"
            onClick={() => handleOpenConfirmModal(record.key)}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

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
        onChange={handleTablePageChange}
        bordered
        className={styles.table}
      />
    </div>
  );
};
