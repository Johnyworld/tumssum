import { h, FunctionalComponent } from 'preact';
import MonthSelector from '~components/items/MonthSelector';
import Aside from '~components/layouts/Aside';
import PageContainer from '~components/layouts/PageComtainet/PageContainer';
import Header from '~components/layouts/Header';
import Button from '~components/elements/Button';
import Calendar from '~components/items/Calendar';
import CategoryBoard from '~components/items/CategoryBoard';
import NavigationMenu from '~components/items/NavigationMenu';
import Indicator from '~components/layouts/Indicator';
import Modal from '~components/layouts/Modal';
import AccountFormModal from '~components/partials/AccountFormModal';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev, changeMonthToday } from '~features/month/monthSlice';
import { useEffect, useRef, useState } from 'preact/hooks';
import useAccountDetail from '~hooks/useAccountDetail';
import useToggle from '~hooks/useToggle';
import { IconType } from 'types';
import useAccount from '~hooks/useAccount';
import useDrag from '~hooks/useDrag';


const MENUS = [
	{ id: 'calendar', text: 'Calendar', icon: 'calendar' as IconType },
	{ id: 'category', text: 'Category', icon: 'menu' as IconType },
	{ id: 'bank', text: 'Bank', icon: 'storage' as IconType },
];

type Menu = 'calendar' | 'category' | 'bank';

const HomePage: FunctionalComponent = ({  }) => {

	const date = useSelector(state=> state.month.date);
	const accounts = useSelector(state=> state.account.accounts);
	const { categories, categoryGroups } = useSelector(state=> state.category);
	const toggleCreateModal = useToggle();
	const [selected, setSelected] = useState<Menu>('calendar');
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const { grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useDrag(accounts);

	const { detailView, handleCloseDetail, handleViewDetail } = useAccountDetail();

	const { handleCreateAccount, handleUpdateAccount, handleDeleteAccount, handleDropToUpdateDate, handleDropToUpdateCategory } = useAccount({
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
		<div class='home-page'>
			<Header>
				<MonthSelector
					date={date}
					onPrev={() => dispatch(changeMonthPrev())}
					onNext={() => dispatch(changeMonthNext())}
				/>
			</Header>
			<Indicator>
				<NavigationMenu
					selected={selected}
					onChange={(selected) => setSelected(selected as Menu)}
					list={MENUS}
				/>
				<div class='flex flex-gap-regular'>
					<p class='f-bold t-fit pointer' onClick={() => dispatch(changeMonthToday())}>Today</p>
					<Button size='small' onClick={toggleCreateModal.handleOn} children='+ 새로 추가' />
				</div>
			</Indicator>

			{ selected === 'calendar' &&
				<Calendar
					date={date}
					data={accounts}
					grapping={grapping}
					grappingPos={grappingPos}
					onGrap={handleGrap}
					onDropToUpdate={handleDropToUpdateDate}
					onDragging={handleDragging}
					onClick={handleViewDetail}
				/>
			}

			{ selected === 'category' &&
				<CategoryBoard
					categories={categories}
					categoryGroups={categoryGroups}
					data={accounts.filter(account => account.datetime.substr(0, 7) === date.substr(0, 7))}
					grapping={grapping}
					grappingPos={grappingPos}
					onGrap={handleGrap}
					onDrop={handleDrop}
					onDropToUpdate={handleDropToUpdateCategory}
					onDragging={handleDragging}
					onClick={handleViewDetail}
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
			// <Aside class='hide-desktop' alignRight wide />
	)
}

export default HomePage;

