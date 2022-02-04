import { createPortal } from "react-dom";

const Portal = ({ children }: any) => {
  const el = document.getElementById('modal') as HTMLElement;
  return createPortal(children, el);
};

export default Portal;
