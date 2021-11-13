import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Category, CategoryGroup } from 'types';
import Button from '~components/atoms/Button';
import ContentEditable from '~components/atoms/ContentEditable';
import Dropdown from '~components/atoms/Dropdown';
import Modal from '~components/layouts/Modal';
import LabeledContentEditable from '~components/molecules/LabeledContentEditable';
import { ConfirmFunction } from '~hooks/useConfirm';
import useContentEditable from '~hooks/useContentEditable';
import useInput from '~hooks/useInput';

export interface CategoryFormModalProps {
	category: Category;
	groupList: CategoryGroup[];
	currentDate: string;
	confirm: ConfirmFunction;
	onConfirm: (category: Category, budget: number | null, date: string) => void;
	onDelete: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
	onClose: () => void;
}

const CategoryFormModal: FunctionalComponent<CategoryFormModalProps> = ({ category, groupList, currentDate, confirm, onConfirm, onDelete, onClose }) => {

	const { t } = useTranslation();

	const initV = useMemo(() => { return {
		title: category.title || '',
		memo: category.memo || '',
		group: category.group || 0,
		budget: category.budget ? category.budget + '' : '',
	}}, [category]);

	const [ title, changeTitle ] = useContentEditable(initV.title);
	const [ memo, changeMemo ] = useContentEditable(initV.memo);
	const [ group, setGroup ] = useState<number|string>(initV.group);
	const [ budjet, ___, setBudget ] = useInput(initV.budget);

	const handleChange: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setGroup(e.currentTarget.value);
	}, [group])

	const handleConfirm = () => {
		onConfirm(
			{
				id: category.id,
				title,
				memo,
				group: group ? +group : null,
			} as Category,
			budjet ? +budjet : null,
			currentDate,
		);
	}

	const handleClose = () => {
		if (
			title !== initV.title ||
			memo !== initV.memo ||
			group !== initV.group ||
			budjet !== initV.budget
		) {
			confirm('저장되지 않은 변경사항이 있네요!\n저장하지 않고 창을 닫으시겠어요?', () => {
				onClose();
			});
		}
		else onClose();
	}

	return (
		<Modal.Container onClose={handleClose}>
			<Modal.Content class='gap-mv-regular' padding>

				<ContentEditable
					value={title}
					size='large'
					styleType='transparent'
					weight='bold'
					isOneLine
					placeholder='카테고리 이름을 입력하세요.'
					onChange={changeTitle}
				/>

				<div class='gap-mv-tiny'>
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

					<LabeledContentEditable
						value={memo}
						label='메모'
						placeholder='비어있음'
						onChange={changeMemo}
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
