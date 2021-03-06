import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { Color, DefaultProps } from 'types';
import { c } from '~utils/classNames';
import './Button.scss';

export interface ButtonProps extends DefaultProps, JSXInternal.DOMAttributes<HTMLButtonElement> {
  color?: Color;
  size?: 'small' | 'regular' | 'large';
  paddingX?: 'narrow' | 'normal' | 'wide';
  border?: 'rounded' | 'squared';
  fluid?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: h.JSX.MouseEventHandler<HTMLButtonElement>;
}

const Button: FunctionalComponent<ButtonProps> = ({ children, class: className, style, color='primary', size, paddingX, border, fluid, disabled, type='button', onClick }) => {
  return (
    <button
      style={style}
      class={c( 'button', className, [border, `&--${border}`], [fluid, '&--fluid'], [disabled, '&--disabled'], [size, `&--${size}`], [paddingX, `&--${paddingX}`], [color, `bgc-${color}`] )}
      children={children}
      disabled={disabled}
      type={type}
      onClick={onClick}
    />
  )
}

export default Button;
