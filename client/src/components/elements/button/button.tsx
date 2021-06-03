import { h, FunctionalComponent } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import './button.scss';

export interface ButtonProps extends JSXInternal.DOMAttributes<HTMLButtonElement> {
  fluid?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: h.JSX.MouseEventHandler<HTMLButtonElement>;
}

const button: FunctionalComponent<ButtonProps> = ({ children, fluid, disabled, type, onClick }) => {
  return (
    <button
      class={`button ${fluid ? 'fluid' : ''}`}
      children={children}
      disabled={disabled}
      type={type}
      onClick={onClick}
    />
  )
}

export default button;
