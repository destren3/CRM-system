import { Form, Input } from 'antd';
import styles from './auth-input.module.scss';
import { Rule } from 'antd/es/form';

interface AuthInputProps {
  placeholder?: string;
  name?: string;
  type?: string;
  rules?: Rule[];
}

export const AuthInput = ({
  placeholder,
  name,
  type,
  rules,
}: AuthInputProps) => {
  return (
    <Form.Item className={styles['form-item']} name={name} rules={rules}>
      <Input placeholder={placeholder} type={type} />
    </Form.Item>
  );
};
