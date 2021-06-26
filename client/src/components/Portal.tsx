import { createPortal } from 'preact/compat';

const Portal = ({ children }: any) => {
  const el = document.getElementById('modal') as HTMLElement;
  return createPortal(children, el);
};

export default Portal;