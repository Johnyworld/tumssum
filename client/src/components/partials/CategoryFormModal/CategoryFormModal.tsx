import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { Category } from 'types';
import Button from '~components/elements/Button';
import ContentEditable from '~components/elements/ContentEditable';
import Modal from '~components/layouts/Modal';
import useContentEditable from '~hooks/useContentEditable';

export interface CategoryFormModalProps {
	category: Category;
	onConfirm: (category: Category) => void;
	onDelete: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
}

const CategoryFormModal: FunctionalComponent<CategoryFormModalProps> = ({ category, onConfirm, onDelete }) => {

	const { t } = useTranslation();
	const [ title, changeTitle ] = useContentEditable(category.title || '');

	const handleConfirm = () => {
		onConfirm({
			id: category.id,
			title,
		} as Category);
	}

	return (
		<Modal.Container>
			<Modal.Content class='gap-tiny' padding>

				<ContentEditable
					value={title}
					size='large'
					styleType='transparent'
					weight='bold'
					isOneLine
					placeholder='카테고리 이름을 입력하세요.'
					onChange={changeTitle}
				/>

			</Modal.Content>
			<Modal.Footer flex padding>
				{ onDelete ? <p class='c-red f-bold pointer' onClick={onDelete(category.id)}>삭제</p> : <p /> }
				<Button onClick={handleConfirm} children={t('common_save')} />
			</Modal.Footer>
		</Modal.Container>
	)
}

export default CategoryFormModal;
