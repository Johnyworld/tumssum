import { h, FunctionalComponent } from 'preact';
import { DefaultProps } from 'types';
import Icon from '~components/elements/Icon';
import Portal from '~components/Portal';
import { getClassNames } from '~utils/classNames';
import './Modal.scss';


interface ModalProps extends DefaultProps {
	isOpen: boolean;
}

interface ModalHeaderProps extends DefaultProps {
	heading: string;
	onClose: () => void;
}

interface ModalFooterProps extends DefaultProps {
	flexEnd?: boolean;
	padding?: boolean;
}

const Modal: FunctionalComponent<ModalProps> = ({ children, isOpen }) => {
	return (
		!isOpen ? null :
		<Portal>
			<div class='modal'>
				<div class='modal-dim' />
				<div class='modal-content'>
					{children}
				</div>
			</div>
		</Portal>
	)
}

export const ModalHeader: FunctionalComponent<ModalHeaderProps> = ({ style, class: className, heading, onClose }) => {
	return (
		<div class={getClassNames([ 'modal-header flex p-regular', className ])} style={style} >
			<h3>{heading}</h3>
			<Icon size='medium' as='x' onClick={onClose} />
		</div>
	)
}

export const ModalFooter: FunctionalComponent<ModalFooterProps> = ({ children, style, class: className, flexEnd, padding }) => {
	return (
		<div class={getClassNames([ 'modal-footer', className, [flexEnd, 'flex flex-end flex-gap-small'], [padding, 'p-regular'] ])} style={style}>
			{children}
		</div>
	)
}

export default Object.assign(Modal, {
  Header: ModalHeader,
	Footer: ModalFooter,
});
