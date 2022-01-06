import React from 'react';
import './Button.scss';

export interface ButtonProps {

}

const Button: React.FC<ButtonProps> = ({  }) => {
  return (
    <button className='button bgc-primary'>
      Hello Button
    </button>
  )
}

export default Button;
