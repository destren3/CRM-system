import { InputHTMLAttributes } from 'react';
import styles from './input.module.scss';

interface TInput extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ placeholder, ...props }: TInput) => {
  return (
    <input className={styles.input} placeholder={placeholder} {...props} />
  );
};
