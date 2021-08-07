import { h, FunctionalComponent } from 'preact';
import MonthSelector from '~components/items/MonthSelector';
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
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { IconType } from 'types';
import useAccount from '~hooks/useAccount';
import useDrag from '~hooks/useDrag';
import { combineCategoriesWithGroups } from '~routes/CategoryPage/CategoryPage';
import AccountList from '~components/partials/AccountList';


const MENUS = [
	{ id: 'calendar', text: 'Calendar', icon: 'calendar' as IconType  },
	{ id: 'category', text: 'Category', icon: 'menu' as IconType },
	{ id: 'list', text: 'List', icon: 'storage' as IconType },
];

const HomePage: FunctionalComponent = ({  }) => {

	const date = useSelector(state=> state.month.date);
	const accounts = useSelector(state=> state.account.accounts);
	const { categories, categoryGroups } = useSelector(state=> state.category);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const [view, setView] = useState(localStorage.getItem('home_view') || 'calendar');
	const handleChangeView = (newView: string) => {
		localStorage.setItem('home_view', newView);
		setView(newView);
	}

	const categoriesCombined = useMemo(() => combineCategoriesWithGroups(categories, categoryGroups), [categories, categoryGroups]);

	const { grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useDrag(accounts);

	const { 
		initialValuesForCreate, detailView, handleViewDetail, handleCloseDetail,
		isOpenCreateModal, handleOpenCreateModal, handleOpenCreateModalWithDate, handleOpenCreateModalWithCategory, handleCloseCreateModal,
		handleCreateAccount, handleUpdateAccount, handleDeleteAccount, handleDropToUpdateDate, handleDropToUpdateCategory
	} = useAccount({
		grapping,
		handleDrop,
	});

	useEffect(() => {
	}, [view]);

	useEffect(() => {
		if (inputRef.current && isOpenCreateModal) {
			inputRef.current.focus();
		}
	}, [inputRef.current, isOpenCreateModal]);

	return (
		<main class='home-page main' >

			<Header>
				<MonthSelector
					date={date}
					onPrev={() => dispatch(changeMonthPrev())}
					onNext={() => dispatch(changeMonthNext())}
				/>
			</Header>

			<Indicator>
				<NavigationMenu
					selected={view}
					onChange={handleChangeView}
					list={MENUS}
				/>
				<div class='flex flex-gap-regular'>
					<p class='f-bold t-fit pointer' onClick={() => dispatch(changeMonthToday())}>Today</p>
					<Button size='small' onClick={handleOpenCreateModal} children='+ 새로 추가' />
				</div>
			</Indicator>

			{ view === 'calendar' &&
				<Calendar
					date={date}
					data={accounts}
					grapping={grapping}
					grappingPos={grappingPos}
					onGrap={handleGrap}
					onDropToUpdate={handleDropToUpdateDate}
					onDragging={handleDragging}
					onClick={handleViewDetail}
					onClickPlus={handleOpenCreateModalWithDate}
				/>
			}

			{ view === 'category' &&
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
					onClickPlus={handleOpenCreateModalWithCategory}
				/>
			}

			{ view === 'list' &&
				<AccountList
					list={accounts}
					categoriesCombined={categoriesCombined}
					onChange={handleUpdateAccount}
				/>
			}

			<Modal
				isOpen={isOpenCreateModal}
				onClose={handleCloseCreateModal}
				children={
					<AccountFormModal
						initialValues={initialValuesForCreate}
						categoriesCombined={categoriesCombined}
						onConfirm={handleCreateAccount}
					/>
				}
			/>

			<Modal
				isOpen={!!detailView}
				onClose={handleCloseDetail}
				children={
					<AccountFormModal
						initialValues={detailView!}
						categoriesCombined={categoriesCombined}
						onConfirm={handleUpdateAccount}
						onDelete={handleDeleteAccount}
					/>
				}
			/>
		</main>
	)
}

export default HomePage;

