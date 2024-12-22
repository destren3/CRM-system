import { Button, Space, Table, TablePaginationConfig, Typography } from 'antd';
import { useEffect, useState } from 'react';
import {
  MetaResponseUsers,
  User,
  UserFilters,
  UserRolesRequest,
} from '../../lib/types';
import {
  blockUser,
  deleteUser,
  getUsers,
  unblockUser,
  updateUserRights,
} from '../../api/services';
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

  const handleChangeBlockStatus = async (
    blockStatus: string,
    recordKey: number
  ) => {
    try {
      blockStatus === 'Заблокирован'
        ? await unblockUser(recordKey)
        : await blockUser(recordKey);
      await fetchUsers();
    } catch (error) {
      alert(error);
    }
  };

  const handleChangeRoleStatus = async (
    roleStatus: UserRolesRequest,
    recordKey: number
  ) => {
    try {
      await updateUserRights(roleStatus, recordKey);
      await fetchUsers();
    } catch (error) {
      alert(error);
    }
  };

  const filterUsersByBlockStatus = async () => {
    try {
      await fetchUsers();
    } catch (error) {
      alert(error);
    }
  };

  const openDeleteUserModal = (recordKey: number) => {
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

  const openChangeStatusModal = (blockStatus: string, recordKey: number) => {
    Modal.confirm({
      title: `Вы уверены, что хотите ${blockStatus === 'Заблокирован' ? 'разблокировать' : 'заблокировать'} этого пользователя?`,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        handleChangeBlockStatus(blockStatus, recordKey);
      },
      onCancel() {
        console.log('Изменение отменено');
      },
    });
  };

  const openChangeRoleModal = (
    roleStatus: UserRolesRequest,
    recordKey: number
  ) => {
    Modal.confirm({
      title: `Вы уверены, что хотите изменить роль этого пользователя?`,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        handleChangeRoleStatus(roleStatus, recordKey);
      },
      onCancel() {
        console.log('Изменение отменено');
      },
    });
  };

  const handleTablePageChange = async (pagination: TablePaginationConfig) => {
    try {
      if (pagination.current) setCurrentPage(pagination.current);
      await fetchUsers({ offset: currentPage });
    } catch (error) {
      alert(error);
    }
  };

  const handleNavigateToUser = (id: number) => {
    navigate(`/profile/${id}`);
  };

  const fetchUsers = async (data?: UserFilters) => {
    try {
      const users = await getUsers({ offset: data?.offset });
      setUsers(users);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'registrationDate',
      key: 'Дата регистрации',
    },
    {
      title: 'Статус блокировки',
      dataIndex: 'blockStatus',
      key: 'blockStatus',
      filters: [
        {
          text: 'Заблокирован',
          value: 'Заблокирован',
        },
        {
          text: 'Не заблокирован',
          value: 'Не заблокирован',
        },
      ],
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Действия',
      dataIndex: 'Действия',
      key: 'Действия',
      render: (
        _: string,
        record: { key: number; blockStatus: string; role: string }
      ) => (
        <div className={styles['actions-wrapper']}>
          <Space direction="vertical" size={4}>
            <Button
              type="link"
              onClick={() => handleNavigateToUser(record.key)}
              className={styles['action-button']}
            >
              Профиль
            </Button>
            <Button
              type="link"
              onClick={() =>
                openChangeRoleModal(
                  { field: 'isAdmin', value: record.role === 'User' },
                  record.key
                )
              }
              className={styles['action-button']}
            >
              Изменить роль
            </Button>
            <Button
              type="link"
              danger
              onClick={() =>
                openChangeStatusModal(record.blockStatus, record.key)
              }
              className={styles['action-button']}
            >
              {record.blockStatus === 'Заблокирован'
                ? 'Разблокировать'
                : 'Заблокировать'}
            </Button>
            <Button
              type="link"
              danger
              onClick={() => openDeleteUserModal(record.key)}
              className={styles['action-button']}
            >
              Удалить
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  const data = users?.data?.map((user) => ({
    key: user.id,
    name: user.username || 'Нет данных',
    email: user.email || 'Нет данных',
    registrationDate: user.date || 'Нет данных',
    blockStatus: user.isBlocked ? 'Заблокирован' : 'Не заблокирован',
    role: user.isAdmin === true ? 'Admin' : 'User' || 'Нет данных',
    phoneNumber: user.phoneNumber || 'Нет данных',
  }));

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