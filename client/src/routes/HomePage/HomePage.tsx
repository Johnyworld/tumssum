import { h, FunctionalComponent } from 'preact';
import MonthSelector from '~components/molecules/MonthSelector';
import Header from '~components/layouts/Header';
import Button from '~components/atoms/Button';
import Calendar from '~components/molecules/Calendar';
import CategoryBoard from '~components/molecules/CategoryBoard';
import NavigationMenu from '~components/molecules/NavigationMenu';
import Indicator from '~components/layouts/Indicator';
import Modal from '~components/layouts/Modal';
import AccountFormModal from '~components/organisms/AccountFormModal';
import { useDispatch, useSelector } from '~utils/redux/hooks';
import { changeMonthNext, changeMonthPrev, changeMonthToday } from '~features/month/monthSlice';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { IconType } from 'types';
import useAccount from '~hooks/useAccount';
import useDrag from '~hooks/useDrag';
import { combineCategoriesWithGroups } from '~routes/CategoryPage/CategoryPage';
import AccountList from '~components/organisms/AccountList';
import { combineBanksWithGroups } from '~routes/BankPage/BankPage';
import useCSV from '~hooks/useCSV';
import useResizeSide from '~hooks/useResizeSide';
import IconText from '~components/molecules/IconText';
import Statistics from './Statistics';


const MENUS = [
	{ id: 'calendar', text: 'Calendar', icon: 'calendar' as IconType  },
	{ id: 'category', text: 'Category', icon: 'category' as IconType },
	{ id: 'list', text: 'List', icon: 'menu' as IconType },
];

const HomePage: FunctionalComponent = ({  }) => {

	const date = useSelector(state=> state.month.date);
	const accounts = useSelector(state=> state.account.accounts);
	const { categories, categoryGroups } = useSelector(state=> state.category);
	const { banks, bankGroups } = useSelector(state=> state.bank);
	const { monthes } = useSelector(state=> state.bankMonth);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const accountsThisMonth = useMemo(() => accounts.filter(account => account.datetime.substr(0, 7) === date.substr(0, 7)), [accounts, date]);

	const [view, setView] = useState(localStorage.getItem('home_view') || 'calendar');
	const handleChangeView = (newView: string) => {
		localStorage.setItem('home_view', newView);
		setView(newView);
	}

	const { getCSV } = useCSV({ accounts });

	const categoriesCombined = useMemo(() => combineCategoriesWithGroups(categories, categoryGroups), [categories, categoryGroups]);
	const banksCombined = useMemo(() => combineBanksWithGroups(banks, bankGroups), [banks, bankGroups]);

	const { grapping, grappingPos, handleGrap, handleDrop, handleDragging } = useDrag(accounts);

	const { borderRef, sideWidth, handleBorderMouseDown, handleContainerMouseUp, handleContainerDrag } = useResizeSide();

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
		<main class='home-page main' onMouseUp={handleContainerMouseUp} onMouseLeave={handleContainerMouseUp} onMouseMove={handleContainerDrag}>

			<section class='home-page__content'>
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
						<IconText text='Download' icon='download' isHideTextForMobile onClick={() => getCSV('CSV')} />
						<p class='pointer' onClick={() => dispatch(changeMonthToday())} >Today</p>
						<Button class='hide-mobile' size='small' onClick={handleOpenCreateModal} children='+ 새로 추가' />
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
						categoriesCombined={categoriesCombined}
						data={accountsThisMonth}
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
						list={accountsThisMonth}
						categoriesCombined={categoriesCombined}
						banksCombined={banksCombined}
						onChange={handleUpdateAccount}
					/>
				}
			</section>

			
			<Statistics
				date={date}
				accounts={accountsThisMonth}
				categoriesCombined={categoriesCombined}
				banksCombined={banksCombined}
				monthes={monthes}
				sideWidth={sideWidth}
				borderRef={borderRef}	
				onBorderMouseDown={handleBorderMouseDown}
			/>


			<Modal
				isOpen={isOpenCreateModal}
				onClose={handleCloseCreateModal}
				children={
					<AccountFormModal
						initialValues={initialValuesForCreate}
						categoriesCombined={categoriesCombined}
						banksCombined={banksCombined}
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
						banksCombined={banksCombined}
						onConfirm={handleUpdateAccount}
						onDelete={handleDeleteAccount}
					/>
				}
			/>
		</main>
	)
}

export default HomePage;

