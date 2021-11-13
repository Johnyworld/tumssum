import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Bank, BankGroup } from 'types';
import Button from '~components/atoms/Button';
import ContentEditable from '~components/atoms/ContentEditable';
import Dropdown from '~components/atoms/Dropdown';
import Modal from '~components/layouts/Modal';
import LabeledContentEditable from '~components/molecules/LabeledContentEditable';
import { ConfirmFunction } from '~hooks/useConfirm';
import useContentEditable from '~hooks/useContentEditable';;

export interface BankFormModalProps {
	bank: Bank;
	groupList: BankGroup[];
	confirm: ConfirmFunction;
	onConfirm: (bank: Bank) => void;
	onDelete: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
	onClose: () => void;
}

const BankFormModal: FunctionalComponent<BankFormModalProps> = ({ bank, groupList, confirm, onConfirm, onDelete, onClose }) => {

	const { t } = useTranslation();

	const initV = useMemo(() => { return {
		title: bank.title || '',
		memo: bank.memo || '',
		group: bank.group || 0,
	}}, [bank]);

	const [ title, changeTitle ] = useContentEditable(initV.title);
	const [ memo, changeMemo ] = useContentEditable(initV.memo);
	const [ group, setGroup ] = useState<number|string>(initV.group);

	const handleChange: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setGroup(e.currentTarget.value);
	}, [group])

	const handleConfirm = () => {
		onConfirm({
			id: bank.id,
			title,
			memo,
			group: group || null,
		} as Bank);
	}

	const handleClose = () => {
		if (
			title !== initV.title ||
			memo !== initV.memo ||
			group !== initV.group
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
					placeholder='뱅크 이름을 입력하세요.'
					onChange={changeTitle}
				/>

				<div class='gap-mv-tiny'>
					<Dropdown
						list={[
							{ id: 0, text: '그룹 미분류' },
							...groupList.map(group => { return { id: group.id, text: group.title || '이름 없음' }}),
						]}
						label='뱅크 그룹'
						selected={group}
						onChange={handleChange}
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
				{ onDelete ? <p class='c-red f-bold pointer' onClick={onDelete(bank.id)}>삭제</p> : <p /> }
				<Button onClick={handleConfirm} children={t('common_save')} />
			</Modal.Footer>
		</Modal.Container>
	)
}

export default BankFormModal;
