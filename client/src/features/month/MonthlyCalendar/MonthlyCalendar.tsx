import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Account } from 'types';
import Button from '~components/elements/Button';
import Calendar from '~components/items/Calendar';
import MonthSelector from '~components/items/MonthSelector';
import NavigationMenu from '~components/items/NavigationMenu';
import Modal from '~components/layouts/Modal';
import CreateAccountModal from '~components/partials/CreateAccountModal';
import ViewAccountModal from '~components/partials/ViewAccountModal';
import useCalendarData from '~hooks/useCalendarData';
import useFetch from '~hooks/useFetch';
import useList from '~hooks/useList';
import useToggle from '~hooks/useToggle';
import { getLocalString } from '~utils/calendar';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev, changeMonthToday } from '../monthSlice';


const MonthlyCalendar: FunctionalComponent = () => {

	const date = useSelector(state=> state.month.date);
	const user = useSelector(state=> state.user.userInfo);
	const dispatch = useDispatch();
	const toggleCreateModal = useToggle();
	const [detailView, setDetailView] = useState<null | Account>(null);
	const [selected, setSelected] = useState('calendar');
	const inputRef = useRef<HTMLInputElement>(null);

	const { list, setList, handleUpdate, handleAdd } = useList<Account>([]);

	useFetch<Account[]>({
		method: 'GET',
		url: `/api/accounts/`,
		params: { user_id: user!.id },
		onSuccess: data => {
			setList(data.map(data => {
				return { ...data, datetime: getLocalString(new Date(data.datetime)) }
			}));
		}
	});

	const createNewAccount = useFetch<Account>({
		method: 'POST',
		url: '/api/account/',
		onSuccess: data => {
			handleAdd(data);
			toggleCreateModal.handleOff();
		}
	});

	const updateAccount = useFetch<Account>({
		method: 'PUT',
		url: '/api/account/',
	});

	const { grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useCalendarData({
		date,
		data: list || [],
		onUpdate: handleUpdate,
	});

	const handleCreateAccount = (title: string, isIncome: boolean, amount: number, datetime: string) => {
		if (createNewAccount.loading) return;
		createNewAccount.call({
			user_id: user!.id,
			title,
			account: isIncome ? amount : -amount,
			datetime,
		})
	}

	const handleDropToUpdate = (date: string) => () => {
		if (updateAccount.loading || !grapping ) return;
		if (date === grapping.datetime.substr(0, 10)) {
			handleDrop(date);
			return;
		}
		const localtime = getLocalString(new Date(grapping.datetime)).split('T')[1];
		const isoString = new Date(date + 'T' + localtime).toISOString();
		updateAccount.call({
			account_id: grapping.id,
			datetime: isoString,
		});
		handleDrop(date);
	}


	const handleViewDetail = (account: Account) => () => {
		setDetailView(account);
	}

	const handleCloseDetail = () => {
		setDetailView(null);
	}


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
					onChange={(selected) => setSelected(selected)}
					list={[
						{ id: 'calendar', text: 'Calendar', icon: 'calendar' },
						{ id: 'category', text: 'Category', icon: 'menu' },
						{ id: 'bank', text: 'Bank', icon: 'storage' },
					]}
				/>
				<div class='flex flex-gap-regular' style={{ paddingRight: '.5rem' }}>
					<p class='f-bold t-fit pointer' onClick={() => dispatch(changeMonthToday())}>Today</p>
					<Button size='small' onClick={toggleCreateModal.handleOn} children='+ 새로 추가' />
				</div>
			</div>

			<Calendar
				date={date}
				data={list || []}
				grapping={grapping}
				grappingPos={grappingPos}
				onGrap={handleGrap}
				onDrop={handleDropToUpdate}
				onDragging={handleDragging}
				onClick={handleViewDetail}
			/>

			<Modal
				isOpen={toggleCreateModal.checked}
				onClose={toggleCreateModal.handleOff}
				children={
					<CreateAccountModal
						onCreateAccount={handleCreateAccount}
						onClose={toggleCreateModal.handleOff}
					/>
				}
			/>

			<Modal
				isOpen={!!detailView}
				onClose={handleCloseDetail}
				children={
					<ViewAccountModal
						data={detailView!}
						onClose={handleCloseDetail}
					/>
				}
			/>

		</div>
	)
}


export default MonthlyCalendar;
