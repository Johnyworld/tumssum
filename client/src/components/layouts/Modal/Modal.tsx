import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { DefaultProps } from 'types';
import Icon from '~components/atoms/Icon';
import IconText from '~components/molecules/IconText';
import Portal from '~components/Portal';
import { c } from '~utils/classNames';
import './Modal.scss';


interface ModalProps extends DefaultProps {
	isOpen: boolean;
}

interface ModalContainerProps extends DefaultProps {
	onClose?: () => void;
}

interface ModalXButtonProps extends DefaultProps {
	onClose: () => void;
}

interface ModalHeaderProps extends DefaultProps {
	sticky?: boolean;
	shadow?: boolean;
	onGoBack?: () => void;
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

const Modal: FunctionalComponent<ModalProps> = ({ children, isOpen }) => {

	useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

	return (
		!isOpen ? null :
		<Portal>
			{children}
		</Portal>
	)
}

export const ModalContainer: FunctionalComponent<ModalContainerProps> = ({ children, onClose }) => {

	useEffect(() => {
		if (!onClose) return;
		const keyEvent = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
		window.addEventListener('keydown', keyEvent);
		return () => window.removeEventListener('keydown', keyEvent);
	}, [onClose]);

	return (
		<div class='modal'>
			<div class='modal__dim dim' onClick={onClose} />
			<div class='modal__container'>
				{children}
			</div>
		</div>
	)
}

export const ModalXbutton: FunctionalComponent<ModalXButtonProps> = ({ style, class: className, onClose }) => {
	return (
		<Icon class={c('modal__x-button', 'p-large p-regular-mobile', className )} style={style} size='medium' as='x' onClick={onClose} />
	)
}

export const ModalHeader: FunctionalComponent<ModalHeaderProps> = ({ style, class: className, children, sticky, shadow, onGoBack }) => {
	return (
		<div class={c('modal__header', 'flex p-large p-regular-mobile', className, [sticky, '&--sticky'], [shadow, '&--shadow'] )} style={style} >
			{ onGoBack
				? <IconText icon='arrowLeft' text={children+''} onClick={onGoBack} />
				: <h3>{children}</h3>
			}
		</div>
	)
}

export const ModalContent: FunctionalComponent<ModalContentProps> = ({ children, style, class: className, padding, preLine }) => {
	return (
		<div class={c('modal__content', className, [padding, 'p-large p-regular-mobile'], [preLine, '&--pre-line'] )} style={style}>
			{children}
		</div>
	)
}

export const ModalFooter: FunctionalComponent<ModalFooterProps> = ({ children, style, class: className, flex, flexEnd, padding, sticky }) => {
	return (
		<div class={c('modal__footer', className, [flex, 'flex'], [flexEnd, 'flex flex-end gap-small'], [padding, 'p-large p-regular-mobile'], [sticky, '&--sticky'])} style={style}>
			{children}
		</div>
	)
}

export default Object.assign(Modal, {
	Container: ModalContainer,
  XButton: ModalXbutton,
  Header: ModalHeader,
  Content: ModalContent,
	Footer: ModalFooter,
});
