import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { Color, DefaultProps } from 'types';
import './Button.scss';

export interface ButtonProps extends DefaultProps, JSXInternal.DOMAttributes<HTMLButtonElement> {
  color?: Color;
  size?: 'regular' | 'large';
  fluid?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: h.JSX.MouseEventHandler<HTMLButtonElement>;
}

const button: FunctionalComponent<ButtonProps> = ({ children, class: className, style, color='primary', size='regular', fluid, disabled, type, onClick }) => {
  return (
    <button
      style={style}
      class={`button ${className || ''} ${fluid ? 'fluid' : ''} ${size} ${color ? `bgc-${color}` : ''}`.trim()}
      children={children}
      disabled={disabled}
      type={type}
      onClick={onClick}
    />
  )
}

export default button;
