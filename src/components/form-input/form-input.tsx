import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

interface AuthInputProps {
  placeholder?: string;
  name?: string;
  type?: string;
  rules?: Rule[];
  value?: string;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const FormInput = ({
  placeholder,
  name,
  type,
  rules,
  value,
  handleInputChange,
  className,
}: AuthInputProps) => {
  return (
    <Form.Item className={className} name={name} rules={rules}>
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleInputChange}
      />
    </Form.Item>
  );
};
