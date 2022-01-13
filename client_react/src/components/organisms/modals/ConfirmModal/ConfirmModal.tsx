import React, { useEffect } from 'react';
import Button from '~/components/atoms/Button';
import './ConfirmModal.scss';

export interface ConfirmModalProps {
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {

	useEffect(() => {
		const close = (e: KeyboardEvent) => e.key === 'Escape' && onCancel();
		window.addEventListener('keyup', close);
		return () => window.removeEventListener('keyup', close);
	}, []);

	return (
		<div className='confirm-modal'>
			<div className='confirm-modal__dim' />
			<div className='confirm-modal__container'>
				<div className='confirm-modal__content'>
					{message}
				</div>
				<div className='confirm-modal__footer'>
					<Button
						fluid
						children='아니오'	
						color='paper'
						onClick={onCancel}
					/>
					<Button
						fluid
						children='예'	
						onClick={onConfirm}
					/>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal;
