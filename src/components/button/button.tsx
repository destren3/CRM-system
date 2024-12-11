import styles from './button.module.scss';
import { ButtonColors, ButtonSize } from './button-constants';
import React from 'react';

interface TButton {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  content: React.ReactNode | string;
  style: (typeof ButtonSize)[keyof typeof ButtonSize];
  color: (typeof ButtonColors)[keyof typeof ButtonColors];
}

export const Button = ({ onButtonClick, content, style, color }: TButton) => {
  return (
    <button
      className={`${styles.button} ${style === ButtonSize.BIG ? styles[`button-${ButtonSize.BIG}`] : styles[`button-${ButtonSize.SMALL}`]}
			 ${color === ButtonColors.SECONDARY ? styles[`button-${ButtonColors.SECONDARY}`] : styles[`button-${ButtonColors.PRIMARY}`]}`}
      onClick={(e) => onButtonClick(e)}
      type="submit"
    >
      {content}
    </button>
  );
};
