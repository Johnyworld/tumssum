import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Account, IconType } from 'types';
import Button from '~components/elements/Button';
import Calendar from '~components/items/Calendar';
import CategoryBoard from '~components/items/CategoryBoard';
import MonthSelector from '~components/items/MonthSelector';
import NavigationMenu from '~components/items/NavigationMenu';
import Modal from '~components/layouts/Modal';
import AccountFormModal from '~components/partials/AccountFormModal';
import { updateAccount } from '~features/account/accountSlice';
import useAccount from '~hooks/useAccount';
import useAccountDetail from '~hooks/useAccountDetail';
import useCalendarData from '~hooks/useCalendarData';
import useToggle from '~hooks/useToggle';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev, changeMonthToday } from '../monthSlice';



const MENUS = [
	{ id: 'calendar', text: 'Calendar', icon: 'calendar' as IconType },
	{ id: 'category', text: 'Category', icon: 'menu' as IconType },
	{ id: 'bank', text: 'Bank', icon: 'storage' as IconType },
];

type Menu = 'calendar' | 'category' | 'bank';

const MonthlyCalendar: FunctionalComponent = () => {

	const date = useSelector(state=> state.month.date);
	const accounts = useSelector(state=> state.account.accounts);
	const dispatch = useDispatch();
	const toggleCreateModal = useToggle();
	const [selected, setSelected] = useState<Menu>('calendar');
	const inputRef = useRef<HTMLInputElement>(null);

	const { grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useCalendarData({
		date,
		data: accounts || [],
		onUpdate: (id: number, data: Account) => dispatch(updateAccount({ id, data }))
	});

	const { detailView, handleCloseDetail, handleViewDetail } = useAccountDetail();

	const { handleCreateAccount, handleDeleteAccount, handleDropToUpdate, handleUpdateAccount } = useAccount({
		grapping,
		handleCloseCreateModal: toggleCreateModal.handleOff,
		handleCloseDetails: handleCloseDetail,
		handleDrop,
	});

	useEffect(() => {
		if (inputRef.current && toggleCreateModal.checked) {
			inputRef.current.focus();
		}
	}, [inputRef.current, toggleCreateModal.checked]);

	return (
		<div class='monthly-calendar' >

			<MonthSelector
				date={date}
				onPrev={() => dispatch(changeMonthPrev())}
				onNext={() => dispatch(changeMonthNext())}
			/>

			<div class='flex mv-large mv-none-tablet p-small-tablet'>
				<NavigationMenu
					selected={selected}
					onChange={(selected) => setSelected(selected as Menu)}
					list={MENUS}
				/>
				<div class='flex flex-gap-regular' style={{ paddingRight: '.5rem' }}>
					<p class='f-bold t-fit pointer' onClick={() => dispatch(changeMonthToday())}>Today</p>
					<Button size='small' onClick={toggleCreateModal.handleOn} children='+ 새로 추가' />
				</div>
			</div>

			{ selected === 'calendar' &&
				<Calendar
					date={date}
					data={accounts || []}
					grapping={grapping}
					grappingPos={grappingPos}
					onGrap={handleGrap}
					onDrop={handleDropToUpdate}
					onDragging={handleDragging}
					onClick={handleViewDetail}
				/>
			}

			{ selected === 'category' &&
				<CategoryBoard
				/>
			}

			<Modal
				isOpen={toggleCreateModal.checked}
				onClose={toggleCreateModal.handleOff}
				children={
					<AccountFormModal
						onConfirm={handleCreateAccount}
						onClose={toggleCreateModal.handleOff}
					/>
				}
			/>

			<Modal
				isOpen={!!detailView}
				onClose={handleCloseDetail}
				children={
					<AccountFormModal
						initialValues={detailView!}
						onConfirm={handleUpdateAccount}
						onClose={toggleCreateModal.handleOff}
						onDelete={handleDeleteAccount}
					/>
				}
			/>

		</div>
	)
}


export default MonthlyCalendar;
