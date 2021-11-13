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
	onClose: () => void;
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
}

interface ModalFooterProps extends DefaultProps {
	flex?: boolean;
	flexEnd?: boolean;
	padding?: boolean;
	sticky?: boolean;
}

const Modal: FunctionalComponent<ModalProps> = ({ children, isOpen, onClose }) => {

	useEffect(() => {
		const keyEvent = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
		if (isOpen) {
			window.addEventListener('keydown', keyEvent);
			return () => window.removeEventListener('keydown', keyEvent);
		}
	}, [isOpen]);

	useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

	return (
		!isOpen ? null :
		<Portal>
			<div class='modal'>
				<div class='modal-dim dim' onClick={onClose} />
				{children}
			</div>
		</Portal>
	)
}

export const ModalContainer: FunctionalComponent = ({ children }) => {
	return (
		<div class='modal-container'>
			{children}
		</div>
	)
}

export const ModalXbutton: FunctionalComponent<ModalXButtonProps> = ({ style, class: className, onClose }) => {
	return (
<<<<<<< Updated upstream
		<Icon class={c('modal-x-button p-large p-regular-mobile', className )} style={style} size='medium' as='x' onClick={onClose} />
=======
		<Icon class={c('modal__x-button', 'p-large p-regular-mobile', className )} style={style} size='medium' as='x' onClick={onClose} />
>>>>>>> Stashed changes
	)
}

export const ModalHeader: FunctionalComponent<ModalHeaderProps> = ({ style, class: className, children, sticky, shadow, onGoBack }) => {
	return (
<<<<<<< Updated upstream
		<div class={c( 'modal-header flex p-large p-regular-mobile', className, [sticky, 'modal-header--sticky'], [shadow, 'modal-header--shadow'] )} style={style} >
=======
		<div class={c('modal__header', 'flex p-large p-regular-mobile', className, [sticky, '&--sticky'], [shadow, '&--shadow'] )} style={style} >
>>>>>>> Stashed changes
			{ onGoBack
				? <IconText icon='arrowLeft' text={children+''} onClick={onGoBack} />
				: <h3>{children}</h3>
			}
		</div>
	)
}

export const ModalContent: FunctionalComponent<ModalContentProps> = ({ children, style, class: className, padding }) => {
	return (
<<<<<<< Updated upstream
		<div class={c( 'modal-content', className, [padding, 'p-large p-regular-mobile'] )} style={style}>
=======
		<div class={c('modal__content', className, [padding, 'p-large p-regular-mobile'] )} style={style}>
>>>>>>> Stashed changes
			{children}
		</div>
	)
}

export const ModalFooter: FunctionalComponent<ModalFooterProps> = ({ children, style, class: className, flex, flexEnd, padding, sticky }) => {
	return (
<<<<<<< Updated upstream
		<div class={c( 'modal-footer', className, [flex, 'flex'], [flexEnd, 'flex flex-end gap-small'], [padding, 'p-large p-regular-mobile'], [sticky, 'modal-footer--sticky'])} style={style}>
=======
		<div class={c('modal__footer', className, [flex, 'flex'], [flexEnd, 'flex flex-end gap-small'], [padding, 'p-large p-regular-mobile'], [sticky, '&--sticky'])} style={style}>
>>>>>>> Stashed changes
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
