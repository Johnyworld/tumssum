import React from 'react';
import { Color, DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './Button.scss';

export interface ButtonProps extends DefaultProps {
  color?: Color;
  size?: 'small' | 'regular' | 'large';
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
      children={children || 'Confirm'}
      disabled={disabled}
      type={type}
      onClick={onClick}
    />
  )
}

export default Button;
