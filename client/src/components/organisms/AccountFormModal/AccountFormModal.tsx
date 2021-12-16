import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { Account, Bank, BankGroup, CategoryGroup } from 'types';
import Button from '~components/atoms/Button';
import ContentEditable from '~components/atoms/ContentEditable';
import Dropdown from '~components/atoms/Dropdown';
import LabeledContentEditable from '~components/molecules/LabeledContentEditable';
import Modal from '~components/layouts/Modal';
import useContentEditable from '~hooks/useContentEditable';
import useInput from '~hooks/useInput';
import { getLocalString } from '~utils/calendar';
import { ConfirmFunction } from '~hooks/useConfirm';
import DateContent from '~features/DateContent';
import TimeContent from '~features/TimeContent';
import './AccountFormModal.scss';
import NavigationMenu from '~components/molecules/NavigationMenu';
import useToast from '~hooks/useToast';

export interface AccountFormModalProps {
	currentDate: string;
	initialValues?: Account | null;
	categoriesCombined: CategoryGroup[];
	banksCombined: BankGroup[];
	banks: Bank[];
	confirm: ConfirmFunction;
	isCreateMode?: boolean;
	onConfirm: (account: Account) => void;
	onDelete?: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
	onClose: () => void;
}


const getInitialMode = (initialValues?: Account | null) => {
	if (initialValues?.to) return initialValues.bank ? 'SEND' : 'MODIFY';
	return 'WRITE';
}

const getIsIncludeInBanks = (id: number | string | null, banks: Bank[]) => {
	// 리스트에 존재하면 id 를 리턴
	// 리스트에 존재하지 않으면 null 리턴
	if (!id) return '';
	const bank = banks.find(bank => bank.id === +id);
	return bank ? bank.id : '';
}

type Mode
	= 'WRITE' // 가계부를 입력합니다.
	| 'SEND' // 뱅크 => 뱅크간 금액을 전달합니다.
	| 'MODIFY'; // 하나의 뱅크에 금액을 수정합니다.

const AccountFormModal: FunctionalComponent<AccountFormModalProps> = ({ currentDate, initialValues, categoriesCombined, banksCombined, banks, confirm, isCreateMode, onConfirm, onDelete, onClose }) => {
	console.log('===== AccountFormModal', initialValues?.account);

	const { t } = useTranslation();
	const toast = useToast();
	const today = getLocalString();

	const initV = useMemo(() => { return {
		title: initialValues?.title || '',
		amount: initialValues?.account ? Math.abs(initialValues.account)+'' : '',
		date: initialValues?.datetime || (today.substr(0, 7) === currentDate ? today : currentDate + '-01'),
		time: initialValues?.datetime?.split('T')[1]?.substr(0,5) || '',
		memo: initialValues?.memo || '',
		category: initialValues?.category || '',
		bank: initialValues?.bank || (isCreateMode ? getIsIncludeInBanks(localStorage.getItem('account-bank'), banks) : ''),
		to: initialValues?.to || '',
	}}, [initialValues]);

	const [ mode, setMode ] = useState<Mode>(getInitialMode(initialValues));
	const [ title, changeTitle ] = useContentEditable(initV.title);
	const [amount, ___, setAmmount] = useInput(initV.amount);
	const [isIncome, setIsIncome] = useState(initialValues?.account ? !(initialValues.account < 0) : false);
	const [date, _, setDate] = useInput(initV.date);
	const [time, __, setTime] = useInput(initV.time);
	const [ memo, changeMemo ] = useContentEditable(initV.memo);
	const [ category, setCategory ] = useState<number|string>(initV.category);
	const [ bank, setBank ] = useState<number|string>(initV.bank);
	const [ to, setTo ] = useState<number|string>(initV.to);


	const handleChangeCategory: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setCategory(e.currentTarget.value);
	}, [category])

	const handleChangeBank: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setBank(e.currentTarget.value);
		localStorage.setItem('account-bank', e.currentTarget.value);
	}, [category])

	const handleChangeTo: h.JSX.GenericEventHandler<HTMLSelectElement> = useCallback((e) => {
		setTo(e.currentTarget.value);
	}, [category])

	const handleChangeIsIncome = useCallback((value: boolean) => {
		setIsIncome(!value);
	}, [isIncome]);
	

	const handleSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const theDate = date.split('T')[0];
		const theTime = time ? 'T' + time : '';
		const then = new Date(theDate + theTime);
		const datetime = time ? then.toISOString() : then.toISOString().substr(0, 10);
		if (mode === 'SEND' && (!bank || !to)) {
			toast('받는 곳과 보내는 곳을 선택해주세요!', 'red');
			return;
		}
		if (mode === 'MODIFY' && !to) {
			toast('받는 곳을 선택해주세요!', 'red');
			return;
		}
		onConfirm({
			id: initialValues?.id,
			title: mode === 'WRITE' ? title : '',
			account: mode === 'SEND' ? Math.abs(+amount) : isIncome ? +amount : -amount,
			datetime,
			memo,
			category: mode === 'WRITE' ? +category || null : null,
			bank: mode === 'MODIFY' ? null : +bank || null,
			to: (mode === 'SEND' || mode === 'MODIFY') ? +to || null : null,
		} as Account);
	}

	const handleClose = () => {
		if (
			title !== initV.title ||
			amount !== initV.amount ||
			date !== initV.date ||
			time !== initV.time ||
			memo !== initV.memo ||
			category !== initV.category ||
			bank !== initV.bank ||
			to !== initV.to
		) {
			confirm('저장되지 않은 변경사항이 있네요!\n저장하지 않고 창을 닫으시겠어요?', () => {
				onClose();
			});
		}
		else onClose();
	}

	return (
		<Modal.Container onClose={handleClose}>

			{ isCreateMode &&
				<div class='account-form__menu-wrap'>
					<NavigationMenu
						selected={mode}
						hideText='always'
						onChange={setMode}
						list={[
							{ id: 'WRITE', icon: 'pencel' },
							{ id: 'SEND', icon: 'arrowRight' },
							{ id: 'MODIFY', icon: 'storage' },
						]}
					/>
				</div>
			}

			<form onSubmit={handleSubmit}>
				<Modal.Content padding class='gap-mv-big'>

					{ mode === 'SEND' && isCreateMode &&
						<h3 style={{ lineHeight: '34px' }}>다른 뱅크로 금액을 보냅니다.</h3>
					}

					{ mode === 'MODIFY' && isCreateMode &&
						<h3 style={{ lineHeight: '34px' }}>뱅크의 금액을 수정합니다.</h3>
					}

					{ mode === 'WRITE' &&
						<ContentEditable
							value={title}
							size='large'
							weight='bold'
							styleType='transparent'
							isOneLine
							placeholder='제목을 입력하세요.'
							onChange={changeTitle}
						/>
					}

					<div class='gap-mv-tiny'>
						<LabeledContentEditable
							value={amount}
							type='number'
							label='금액'
							color={mode === 'SEND' ? 'pen' : isIncome ? 'pen' : 'red'}
							weight='bold'
							placeholder='비어있음'
							isNumberNegative={!isIncome}
							isHideNumberSign={mode === 'SEND'}
							onChange={setAmmount}
							onChangeNumberNegative={mode === 'SEND' ? undefined : handleChangeIsIncome}
						/>

						{ mode === 'WRITE' &&
							<Dropdown
								list={[
									...categoriesCombined.map(group => { return {
										id: group.id,
										text: group.title || '이름 없음',
										children: group.items.map(category => { return {
											id: category.id,
											text: category.title,
										}})
									}}),
								]}
								label='카테고리'
								placeholder='미분류'
								selected={category}
								onChange={handleChangeCategory}
							/>
						}

						{( mode === 'WRITE' || mode === 'SEND' ) &&
							<Dropdown
								list={[
									...banksCombined.map(group => { return {
										id: group.id,
										text: group.title || '이름 없음',
										children: group.items.map(bank => { return {
											id: bank.id,
											text: bank.title,
										}})
									}}),
								]}
								label={mode === 'SEND' ? '보내는 곳' : '뱅크'}
								placeholder='미분류'
								selected={bank}
								onChange={handleChangeBank}
							/>
						}

						{( mode === 'SEND' || mode === 'MODIFY' ) &&
							<Dropdown
								list={[
									...banksCombined.map(group => { return {
										id: group.id,
										text: group.title || '이름 없음',
										children: group.items.map(bank => { return {
											id: bank.id,
											text: bank.title,
										}})
									}}),
								]}
								label={mode === 'SEND' ? '받는 곳' : '뱅크'}
								placeholder='미분류'
								selected={to}
								onChange={handleChangeTo}
							/>
						}
						
						<DateContent label='날짜' date={date} onChange={(date) => setDate(date)} placeholder='비어있음' />
						<TimeContent label='시간' time={time} onChange={(date) => setTime(date)} placeholder='비어있음' />
						<LabeledContentEditable
							value={memo}
							label='메모'
							placeholder='비어있음'
							onChange={changeMemo}
						/>
					</div>
				</Modal.Content>

				<Modal.Footer flex padding>
					{ onDelete && initialValues ? <p class='c-red f-bold pointer' onClick={onDelete(initialValues.id)}>삭제</p> : <p /> }
					<Button type='submit' children={t('common_save')} />
				</Modal.Footer>

			</form>
		</Modal.Container>
	)
}

export default AccountFormModal;
