import React from 'react';
import './Button.scss';

export interface ButtonProps {

}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button
      className='button bgc-primary'
      children={children || 'Confirm'}
    />
  )
}

export default Button;
