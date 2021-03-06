import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { CategoryGroup } from 'types';
import Button from '~components/atoms/Button';
import ContentEditable from '~components/atoms/ContentEditable';
import Modal from '~components/layouts/Modal';
import useContentEditable from '~hooks/useContentEditable';

export interface CategoryGroupFormModalProps {
	group: CategoryGroup;
	onConfirm: (group: CategoryGroup) => void;
	onDelete: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
	onClose: () => void;
}

const CategoryGroupFormModal: FunctionalComponent<CategoryGroupFormModalProps> = ({ group, onConfirm, onDelete, onClose }) => {

	const { t } = useTranslation();
	const [ title, changeTitle ] = useContentEditable(group.title || '');

	const handleConfirm = () => {
		onConfirm({
			id: group.id,
			title,
		} as CategoryGroup);
	}

	return (
		<Modal.Container onClose={onClose}>
			<Modal.Content class='gap-mv-tiny' padding>

				<ContentEditable
					value={title}
					size='large'
					styleType='transparent'
					weight='bold'
					isOneLine
					placeholder='카테고리 그룹 이름을 입력하세요.'
					onChange={changeTitle}
				/>

			</Modal.Content>
			<Modal.Footer flex padding>
				{ onDelete ? <p class='c-red f-bold pointer' onClick={onDelete(group.id)}>삭제</p> : <p /> }
				<Button onClick={handleConfirm} children={t('common_save')} />
			</Modal.Footer>
		</Modal.Container>
	)
}

export default CategoryGroupFormModal;
