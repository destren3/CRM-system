import styles from "./button.module.scss";
import { ButtonColors, ButtonSize } from "../../lib/constants";
import React from "react";

interface TButton {
  onButtonClick: () => void;
  content: React.ReactNode | string;
  style: (typeof ButtonSize)[keyof typeof ButtonSize];
  color: (typeof ButtonColors)[keyof typeof ButtonColors];
}

export const Button = ({ onButtonClick, content, style, color }: TButton) => {
  return (
    <button
      className={`${style === ButtonSize.BIG ? styles[`button-${ButtonSize.BIG}`] : styles[`button-${ButtonSize.SMALL}`]}
			 ${color === ButtonColors.RED ? styles[`button-${ButtonColors.RED}`] : styles[`button-${ButtonColors.BLUE}`]}`}
      onClick={onButtonClick}
    >
      {content}
    </button>
  );
};
