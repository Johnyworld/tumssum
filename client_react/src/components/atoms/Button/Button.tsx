import React from 'react';
import { ChromaticColor, DefaultProps, ThreeSize } from 'types';
import { c } from '~/utils/classNames';
import './Button.scss';

export interface ButtonProps extends DefaultProps {
  color?: ChromaticColor;
  size?: ThreeSize;
  type?: 'button' | 'submit';
  fluid?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}


const Button: React.FC<ButtonProps> = ({ children, className, style, color='primary', size, fluid, disabled, type='button', onClick  }) => {

  const classNames = c(
    'button',
    className,
    [fluid, '&--fluid'],
    [disabled, '&--disabled'],
    [size, `&--${size}`],
    [color, `bgc-${color}`],
  )

  return (
    <button
      className={classNames}
      style={style}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <span className='button__text'>{children || 'Confirm'}</span>
    </button>
  )
}

export default Button;
