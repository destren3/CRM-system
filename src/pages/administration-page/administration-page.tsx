import {
  Button,
  Input,
  Space,
  Table,
  TablePaginationConfig,
  Typography,
  Modal,
} from 'antd';
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
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TableRow } from './types';
import { SearchOutlined } from '@ant-design/icons';
import { BlockStatus, BlockStatusLocalization } from './constants';

const { Title } = Typography;

export const AdministrationPage = () => {
  const [users, setUsers] = useState<MetaResponseUsers<User> | null>(null);
  const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(1);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetchUsers({ search: e.target.value });
  };

  const handleDeleteUser = async (recordKey: number, currentPage: number) => {
    try {
      await deleteUser(recordKey);
      await fetchUsers({ offset: currentPage });
    } catch (error) {
      alert(error);
    }
  };

  const handleChangeBlockStatus = async (
    blockStatus: boolean,
    recordKey: number,
    currentPage: number
  ) => {
    try {
      blockStatus ? await unblockUser(recordKey) : await blockUser(recordKey);
      await fetchUsers({ offset: currentPage });
    } catch (error) {
      alert(error);
    }
  };

  const handleChangeRoleStatus = async (
    roleStatus: UserRolesRequest,
    recordKey: number,
    currentPage: number
  ) => {
    try {
      await updateUserRights(roleStatus, recordKey);
      await fetchUsers({ offset: currentPage });
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
        handleDeleteUser(recordKey, currentPaginationPage);
      },
      onCancel() {
        console.log('Удаление отменено');
      },
    });
  };

  const openChangeStatusModal = (isBlocked: boolean, recordKey: number) => {
    Modal.confirm({
      title: `Вы уверены, что хотите ${
        isBlocked ? 'разблокировать' : 'заблокировать'
      } этого пользователя?`,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        handleChangeBlockStatus(isBlocked, recordKey, currentPaginationPage);
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
      title: 'Вы уверены, что хотите изменить роль этого пользователя?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        handleChangeRoleStatus(roleStatus, recordKey, currentPaginationPage);
      },
      onCancel() {
        console.log('Изменение отменено');
      },
    });
  };

  const handleTablePageChange = async (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<TableRow> | SorterResult<TableRow>[]
  ) => {
    try {
      if (Array.isArray(sorter)) {
        return;
      }
      setCurrentPaginationPage(pagination.current || 1);

      if (filters.blockStatus) {
        const isBlocked = filters.blockStatus[0] === BlockStatus.BLOCKED;
        await fetchUsers({
          isBlocked: isBlocked,
          offset: pagination.current,
        });
      } else if (sorter.field === 'email') {
        const sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
        await fetchUsers({
          sortBy: 'email',
          sortOrder: sortOrder,
          offset: pagination.current,
        });
      } else if (sorter.field === 'name') {
        const sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
        await fetchUsers({
          sortBy: 'name',
          sortOrder: sortOrder,
          offset: pagination.current,
        });
      } else {
        await fetchUsers({
          offset: pagination.current,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleNavigateToUser = (id: number) => {
    navigate(`/user-profile/${id}`);
  };

  const fetchUsers = async (data?: UserFilters) => {
    try {
      const users = await getUsers({
        offset: data?.offset,
        isBlocked: data?.isBlocked,
        sortBy: data?.sortBy,
        sortOrder: data?.sortOrder,
        search: data?.search,
      });
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
          value: BlockStatus.BLOCKED,
        },
        {
          text: 'Не заблокирован',
          value: BlockStatus.UNBLOCKED,
        },
      ],
      filterMultiple: false,
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
        record: { key: number; isBlocked: boolean; role: string }
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
                openChangeStatusModal(record.isBlocked, record.key)
              }
              className={styles['action-button']}
            >
              {record.isBlocked ? 'Разблокировать' : 'Заблокировать'}
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
    registrationDate: new Date(user.date).toLocaleString('ru') || 'Нет данных',
    blockStatus:
      BlockStatusLocalization[
        user.isBlocked ? BlockStatus.BLOCKED : BlockStatus.UNBLOCKED
      ],
    role: user.isAdmin ? 'Admin' : 'User',
    phoneNumber: user.phoneNumber || 'Нет данных',
    isBlocked: user.isBlocked,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          Список пользователей
        </Title>
        <Input
          className={styles['search-input']}
          placeholder="Поиск по таблице"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
        />
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 20,
          total: users?.meta.totalAmount,
          showSizeChanger: false,
        }}
        onChange={handleTablePageChange}
        bordered
        className={styles.table}
      />
    </div>
  );
};
