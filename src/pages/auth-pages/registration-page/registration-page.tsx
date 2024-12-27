import { Button, Form, Typography, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import styles from './registration-page.module.scss';
import { FormInput } from '../../../components';
import { UserRegistration } from '../../../lib/types';
import { registerUser } from '../../../api/services';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

export const RegistrationPage = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleRegistrateUser = async (data: UserRegistration) => {
    try {
      await registerUser(data);
      form.resetFields();
      navigate('/login');
      notification.success({
        message: 'Регистрация успешна',
        description:
          'Вы успешно зарегистрировались. Теперь вы можете войти в систему.',
      });
    } catch (error) {
      notification.error({
        message: 'Ошибка регистрации',
        description:
          error instanceof AxiosError
            ? error.response?.data
            : 'Не удалось завершить регистрацию. Попробуйте снова или обратитесь в поддержку.',
      });
    }
  };
  return (
    <>
      <Typography.Title level={4} className={styles.title}>
        Регистрация
      </Typography.Title>
      <Form
        form={form}
        className={styles.form}
        onFinish={(value) =>
          handleRegistrateUser({
            login: value.login,
            username: value.username,
            password: value.password,
            email: value.email,
            phoneNumber: value.phoneNumber,
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
          placeholder="username"
          name="username"
          rules={[
            { required: true, message: 'Введите имя пользователя' },
            {
              min: 1,
              max: 60,
              message: 'Имя пользователя должно быть от 1 до 60 символов',
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
        <FormInput
          placeholder="email"
          name="email"
          rules={[
            { required: true, message: 'Введите адрес электронной почты' },
            {
              type: 'email',
              message: 'Введите корректный адрес электронной почты',
            },
          ]}
          className={styles['form-item']}
        />
        <FormInput
          placeholder="phone number"
          name="phoneNumber"
          rules={[
            {
              pattern: /^\+?\d+$/,
              message:
                'Номер телефона должен содержать только цифры и может начинаться с +',
            },
          ]}
          className={styles['form-item']}
        />
        <Button type="primary" htmlType="submit" className={styles.button}>
          Зарегистрироваться
        </Button>
        <Typography>
          Есть аккаунт? <Link to="/login">Вход</Link>
        </Typography>
      </Form>
    </>
  );
};
