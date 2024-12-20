import { Button, Form, Typography, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import styles from './login-page.module.scss';
import { FormInput } from '../../../components';
import { AuthData } from '../../../lib/types';
import { loginUser } from '../../../api/services';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleLoginUser = async (data: AuthData) => {
    try {
      await loginUser(data);
      form.resetFields();
      navigate('/');
      notification.success({
        message: 'Вход выполнен',
        description: 'Добро пожаловать! Вы успешно вошли в систему.',
      });
    } catch (error) {
      notification.error({
        message: 'Ошибка входа',
        description:
          error instanceof AxiosError
            ? error.response?.data
            : 'Проверьте логин и пароль и попробуйте снова.',
      });
    }
  };
  return (
    <>
      <Typography.Title level={4} className={styles.title}>
        Вход
      </Typography.Title>
      <Form
        form={form}
        className={styles.form}
        onFinish={(value) =>
          handleLoginUser({
            login: value.login,
            password: value.password,
          })
        }
      >
        <FormInput
          placeholder="login"
          name="login"
          rules={[
            { required: true, message: 'Введите логин' },
            {
              min: 2,
              max: 60,
              message: 'Логин должен быть от 2 до 60 символов',
            },
          ]}
          className={styles['form-item']}
        />
        <FormInput
          placeholder="password"
          name="password"
          type="password"
          rules={[
            { required: true, message: 'Введите пароль' },
            {
              min: 6,
              max: 60,
              message: 'Пароль должен быть от 6 до 60 символов',
            },
          ]}
          className={styles['form-item']}
        />
        <Button type="primary" htmlType="submit" className={styles.button}>
          Войти
        </Button>
        <Typography>
          Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
        </Typography>
      </Form>
    </>
  );
};
