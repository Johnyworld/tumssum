import { h, FunctionalComponent } from 'preact';
import { useTranslation } from 'preact-i18next';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { Account, BankGroup, CategoryGroup } from 'types';
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
	confirm: ConfirmFunction;
	isCreateMode?: boolean;
	onConfirm: (account: Account) => void;
	onDelete?: (id: number) => h.JSX.MouseEventHandler<HTMLParagraphElement>;
	onClose: () => void;
}

type Mode = 'WRITE' | 'SEND';

const AccountFormModal: FunctionalComponent<AccountFormModalProps> = ({ currentDate, initialValues, categoriesCombined, banksCombined, confirm, isCreateMode, onConfirm, onDelete, onClose }) => {

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
		bank: initialValues?.bank || '',
		to: initialValues?.to || '',
	}}, [initialValues]);

	const [ mode, setMode ] = useState<Mode>(initialValues?.to ? 'SEND' : 'WRITE');
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
		onConfirm({
			id: initialValues?.id,
			title: mode === 'WRITE' ? title : '',
			account: isIncome ? +amount : -amount,
			datetime,
			memo,
			category: mode === 'WRITE' ? +category || null : null,
			bank: +bank || null,
			to: mode === 'SEND' ? +to || null : null,
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

	useEffect(() => {
		if (mode === 'SEND') {
			setIsIncome(false);
		}
	}, [mode]);

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
							{ id: 'SEND', icon: 'storage' },
						]}
					/>
				</div>
			}

			<form onSubmit={handleSubmit}>
				<Modal.Content padding class='gap-mv-big'>

					{ mode === 'SEND' && isCreateMode &&
						<h3 style={{ lineHeight: '34px' }}>다른 뱅크로 금액을 보냅니다.</h3>
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
							isNumberNegative={mode === 'SEND' ? false : !isIncome}
							isHideNumberSign={mode === 'SEND'}
							onChange={setAmmount}
							onChangeNumberNegative={mode === 'WRITE' ? handleChangeIsIncome : undefined}
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
							label={mode === 'WRITE' ? '뱅크' : '보내는 곳'}
							placeholder='미분류'
							selected={bank}
							onChange={handleChangeBank}
						/>

						{ mode === 'SEND' &&
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
								label='받는 곳'
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
