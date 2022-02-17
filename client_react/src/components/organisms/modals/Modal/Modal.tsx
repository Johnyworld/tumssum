import { useEffect } from 'react';
import { DefaultProps } from 'types';
import Portal from '~/utils/Portal';
import { c } from '~/utils/classNames';
import './Modal.scss';

interface ModalProps extends DefaultProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface ModalContainerProps extends DefaultProps {}

interface ModalHeaderProps extends DefaultProps {
  sticky?: boolean;
  shadow?: boolean;
  onClose?: () => void;
}

interface ModalContentProps extends DefaultProps {
  padding?: boolean;
  preLine?: boolean;
}

interface ModalFooterProps extends DefaultProps {
  flex?: boolean;
  flexEnd?: boolean;
  padding?: boolean;
  sticky?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  useEffect(() => {
    if (!onClose) return;
    const keyEvent = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', keyEvent);
    return () => window.removeEventListener('keydown', keyEvent);
  }, [onClose]);

  return !isOpen ? null : (
    <Portal>
      <div className='modal'>
        <div className='modal__dim dim' onClick={onClose} />
        {children}
      </div>
    </Portal>
  );
};

export const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  return <div className='modal__container'>{children}</div>;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({ style, className, children, sticky, shadow, onClose }) => {
  return (
    <div
      className={c(
        'modal__header',
        'flex p-large p-regular-mobile',
        className,
        [sticky, '&--sticky'],
        [shadow, '&--shadow']
      )}
      style={style}
    ></div>
  );
};

export const ModalContent: React.FC<ModalContentProps> = ({ children, style, className, padding, preLine }) => {
  return (
    <div
      className={c('modal__content', className, [padding, 'p-large p-regular-mobile'], [preLine, '&--pre-line'])}
      style={style}
    >
      {children}
    </div>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  style,
  className,
  flex,
  flexEnd,
  padding,
  sticky,
}) => {
  return (
    <div
      className={c(
        'modal__footer',
        className,
        [flex, '&--flex'],
        [flexEnd, 'flex flex-end gap-small'],
        [padding, 'p-large p-regular-mobile'],
        [sticky, '&--sticky']
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default Object.assign(Modal, {
  Container: ModalContainer,
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});
