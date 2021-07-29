import { h, FunctionalComponent } from 'preact';
import { DefaultProps } from 'types';
import Icon from '~components/elements/Icon';
import IconText from '~components/items/IconText';
import Portal from '~components/Portal';
import { getClassNames } from '~utils/classNames';
import './Modal.scss';


interface ModalProps extends DefaultProps {
	isOpen: boolean;
	onClose: () => void;
}

interface ModalXButtonProps extends DefaultProps {
	onClose: () => void;
}

interface ModalHeaderProps extends DefaultProps {
	onGoBack?: () => void;
}

interface ModalContentProps extends DefaultProps {
	padding?: boolean;
}

interface ModalFooterProps extends DefaultProps {
	flex?: boolean;
	flexEnd?: boolean;
	padding?: boolean;
}

const Modal: FunctionalComponent<ModalProps> = ({ children, isOpen, onClose }) => {
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
		<Icon class={getClassNames(['modal-x-button p-large p-regular-mobile', className ])} style={style} size='medium' as='x' onClick={onClose} />
	)
}

export const ModalHeader: FunctionalComponent<ModalHeaderProps> = ({ style, class: className, children, onGoBack }) => {
	return (
		<div class={getClassNames([ 'modal-header flex p-large p-regular-mobile', className ])} style={style} >
			{ onGoBack
				? <IconText icon='arrowLeft' text={children+''} onClick={onGoBack} />
				: <h3>{children}</h3>
			}
		</div>
	)
}

export const ModalContent: FunctionalComponent<ModalContentProps> = ({ children, style, class: className, padding }) => {
	return (
		<div class={getClassNames([ 'modal-content', className, [padding, 'p-large p-regular-mobile'] ])} style={style}>
			{children}
		</div>
	)
}

export const ModalFooter: FunctionalComponent<ModalFooterProps> = ({ children, style, class: className, flex, flexEnd, padding }) => {
	return (
		<div class={getClassNames([ 'modal-footer', className, [flex, 'flex'], [flexEnd, 'flex flex-end flex-gap-small'], [padding, 'p-large p-regular-mobile'] ])} style={style}>
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
