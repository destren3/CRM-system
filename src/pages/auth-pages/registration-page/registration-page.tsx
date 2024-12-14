import { Button, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import styles from './registration-page.module.scss';
import { AuthInput } from '../../../components';
import { UserRegistration } from '../../../lib/types';
import { registerUser } from '../../../api/services';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleRegistrateUser = async (data: UserRegistration) => {
    try {
      await registerUser(data);
      form.resetFields();
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };
  return (
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
      <AuthInput
        placeholder="login"
        name="login"
        rules={[
          { required: true, message: 'Введите логин' },
          { min: 2, max: 60, message: 'Логин должен быть от 2 до 60 символов' },
        ]}
      />
      <AuthInput
        placeholder="username"
        name="username"
        rules={[
          { required: true, message: 'Введите имя пользователя' },
          {
            min: 2,
            max: 60,
            message: 'Имя пользователя должно быть от 2 до 60 символов',
          },
        ]}
      />
      <AuthInput
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
      />
      <AuthInput
        placeholder="email"
        name="email"
        rules={[
          { required: true, message: 'Введите адрес электронной почты' },
          {
            type: 'email',
            message: 'Введите корректный адрес электронной почты',
          },
        ]}
      />
      <AuthInput
        placeholder="phone number"
        name="phoneNumber"
        rules={[
          {
            pattern: /^\+?\d+$/,
            message:
              'Номер телефона должен содержать только цифры и может начинаться с +',
          },
        ]}
      />
      <Button type="primary" htmlType="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
};
