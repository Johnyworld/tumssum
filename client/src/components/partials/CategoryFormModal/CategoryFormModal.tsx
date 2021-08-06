import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback, useState } from 'preact/hooks';
import { Category, CategoryGroup } from 'types';
import Button from '~components/elements/Button';
import ContentEditable from '~components/elements/ContentEditable';
import Dropdown from '~components/elements/Dropdown';
import Modal from '~components/layouts/Modal';
import useContentEditable from '~hooks/useContentEditable';

export interface CategoryFormModalProps {
	category: Category;
	groupList: CategoryGroup[];
	onConfirm: (category: Category) => void;
	onDelete: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
}

const CategoryFormModal: FunctionalComponent<CategoryFormModalProps> = ({ category, groupList, onConfirm, onDelete }) => {

	const { t } = useTranslation();
	const [ title, changeTitle ] = useContentEditable(category.title || '');
	const [ group, setGroup ] = useState<number|string>(category.group || 0);

	const handleChange: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setGroup(e.currentTarget.value);
	}, [group])

	const handleConfirm = () => {
		onConfirm({
			id: category.id,
			title,
			group: group || null,
		} as Category);
	}

	return (
		<Modal.Container>
			<Modal.Content class='gap-regular' padding>

				<ContentEditable
					value={title}
					size='large'
					styleType='transparent'
					weight='bold'
					isOneLine
					placeholder='카테고리 이름을 입력하세요.'
					onChange={changeTitle}
				/>

				<Dropdown
					list={[
						{ id: 0, text: '그룹 미분류', color: 'gray_strong' },
						...groupList.map(group => { return { id: group.id, text: group.title || '이름 없음' }}),
					]}
					label='카테고리 그룹'
					selected={group}
					onChange={handleChange}
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
