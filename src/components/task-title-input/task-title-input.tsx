import React from 'react';
import { Form, Input } from 'antd';
import styles from './task-title-input.module.scss';

interface TaskTitleInputProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TaskTitleInput = ({
  inputValue,
  handleInputChange,
}: TaskTitleInputProps) => {
  return (
    <Form.Item
      className={styles.input}
      name="title"
      rules={[
        { min: 2, message: 'Задача должна содержать минимум 2 символа.' },
        { max: 64, message: 'Задача должна содержать не более 64 символов.' },
      ]}
    >
      <Input
        placeholder="Task To Be Done"
        value={inputValue || ''}
        onChange={handleInputChange}
      />
    </Form.Item>
  );
};
