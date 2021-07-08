import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { Color, DefaultProps } from 'types';
import { getClassNames } from '~utils/classNames';
import './Button.scss';

export interface ButtonProps extends DefaultProps, JSXInternal.DOMAttributes<HTMLButtonElement> {
  color?: Color;
  size?: 'small' | 'regular' | 'large';
  paddingX?: 'regular' | 'normal' | 'wide';
  fluid?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: h.JSX.MouseEventHandler<HTMLButtonElement>;
}

const Button: FunctionalComponent<ButtonProps> = ({ children, class: className, style, color='primary', size, paddingX, fluid, disabled, type, onClick }) => {

  return (
    <button
      style={style}
      class={getClassNames([ 'button', className, [fluid, 'button-fluid'], [disabled, 'button-disabled'], [size, `button-${size}`], [paddingX, `button-${paddingX}`], [color, `bgc-${color}`] ])}
      children={children}
      disabled={disabled}
      type={type}
      onClick={onClick}
    />
  )
}

export default Button;
