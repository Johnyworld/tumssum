import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback, useState } from 'preact/hooks';
import { Category, CategoryGroup } from 'types';
import Button from '~components/atoms/Button';
import ContentEditable from '~components/atoms/ContentEditable';
import Dropdown from '~components/atoms/Dropdown';
import Modal from '~components/layouts/Modal';
import LabeledContentEditable from '~components/molecules/LabeledContentEditable';
import useContentEditable from '~hooks/useContentEditable';
import useInput from '~hooks/useInput';

export interface CategoryFormModalProps {
	category: Category;
	groupList: CategoryGroup[];
	currentDate: string;
	onConfirm: (category: Category, budget: number | null, date: string) => void;
	onDelete: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
}

const CategoryFormModal: FunctionalComponent<CategoryFormModalProps> = ({ category, groupList, currentDate, onConfirm, onDelete }) => {

	const { t } = useTranslation();
	const [ title, changeTitle ] = useContentEditable(category.title || '');
	const [ group, setGroup ] = useState<number|string>(category.group || 0);
	const [ budjet, ___, setBudget ] = useInput('');

	const handleChange: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setGroup(e.currentTarget.value);
	}, [group])

	const handleConfirm = () => {
		onConfirm(
			{
				id: category.id,
				title,
				group: group ? +group : null,
			} as Category,
			budjet ? +budjet : null,
			currentDate,
		);
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

				<div class='gap-tiny'>
					<Dropdown
						list={[
							{ id: 0, text: '그룹 미분류' },
							...groupList.map(group => { return { id: group.id, text: group.title || '이름 없음' }}),
						]}
						label='카테고리 그룹'
						selected={group}
						onChange={handleChange}
					/>

					<LabeledContentEditable
						value={budjet}
						type='number'
						label='예산'
						weight='bold'
						placeholder='비어있음'
						onChange={setBudget}
						isHideNumberSign
					/>
				</div>

			</Modal.Content>
			<Modal.Footer flex padding>
				{ onDelete ? <p class='c-red f-bold pointer' onClick={onDelete(category.id)}>삭제</p> : <p /> }
				<Button onClick={handleConfirm} children={t('common_save')} />
			</Modal.Footer>
		</Modal.Container>
	)
}

export default CategoryFormModal;
