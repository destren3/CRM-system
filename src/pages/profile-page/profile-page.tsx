import { useCallback, useEffect, useState } from 'react';
import {
  getUser,
  getCurrentUserProfile,
  updateUserData,
  logoutUser,
} from '../../api/services';
import { Profile, UserRequest } from '../../lib/types';
import { Button, Card, Descriptions, Form, Space } from 'antd';
import styles from './profile-page.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { FormInput } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<Profile | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [form] = useForm();
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const handleSetIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEditUserForm = useCallback(async (data: UserRequest) => {
    try {
      if (!id) throw new Error('id обязателен для обновления профиля');
      const userInfo = await updateUserData(data, +id);
      setUserInfo(userInfo);
      setIsEdit(false);
    } catch (error) {
      alert(error);
    }
  }, []);

  const fetchUserInfo = async (id?: number) => {
    try {
      if (!id) {
        const userInfo = await getCurrentUserProfile();
        setUserInfo(userInfo);
      } else {
        const userInfo = await getUser(id);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    id ? fetchUserInfo(+id) : fetchUserInfo();
  }, [id, handleSubmitEditUserForm]);

  return (
    <Card
      title={
        isEdit ? 'Редактировать профиль пользователя' : 'Профиль пользователя'
      }
      className={styles.card}
    >
      {!isEdit ? (
        <>
          <Descriptions column={1} bordered className={styles.descriptors}>
            <Descriptions.Item label="Почта">
              {userInfo?.email || 'Нет данных'}
            </Descriptions.Item>
            <Descriptions.Item label="Телефон">
              {userInfo?.phoneNumber || 'Нет данных'}
            </Descriptions.Item>
            <Descriptions.Item label="Имя">
              {userInfo?.username || 'Нет данных'}
            </Descriptions.Item>
          </Descriptions>
          <Space>
            {user?.isAdmin && (
              <Button onClick={handleSetIsEdit} type="primary">
                Редактировать
              </Button>
            )}
            <Button onClick={handleLogoutClick} color="danger" variant="solid">
              Выйти из системы
            </Button>
          </Space>
        </>
      ) : (
        <Form
          form={form}
          initialValues={{
            email: userInfo?.email,
            phoneNumber: userInfo?.phoneNumber,
            name: userInfo?.username,
          }}
          onFinish={(value) =>
            handleSubmitEditUserForm({
              username: value.name,
              phoneNumber: value.phoneNumber,
              email: value.email,
            })
          }
        >
          <FormInput
            placeholder="Почта"
            name="email"
            rules={[
              { required: true, message: 'Введите адрес электронной почты' },
              {
                type: 'email',
                message: 'Введите корректный адрес электронной почты',
              },
            ]}
          />
          <FormInput
            placeholder="Телефон"
            name="phoneNumber"
            rules={[
              {
                pattern: /^\+?\d+$/,
                message:
                  'Номер телефона должен содержать только цифры и может начинаться с +',
              },
            ]}
          />
          <FormInput
            placeholder="Имя"
            name="name"
            rules={[
              { required: true, message: 'Введите имя пользователя' },
              {
                min: 1,
                max: 60,
                message: 'Имя пользователя должно быть от 1 до 60 символов',
              },
            ]}
          />
          <div className={styles['buttons-wrapper']}>
            <Button type="primary" htmlType="submit">
              Применить
            </Button>
            <Button onClick={handleSetIsEdit} color="danger" variant="solid">
              Отменить
            </Button>
          </div>
        </Form>
      )}
    </Card>
  );
};
